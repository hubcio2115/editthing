import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { createTable } from "./db/schema";
import type { Adapter } from "next-auth/adapters";
import { generateSeedForOrgName, stripSpecialCharacters } from "~/lib/utils";
import {
  createOrganization,
  getOrganizationByName,
} from "./api/utils/organizations";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },

  adapter: DrizzleAdapter(db, createTable) as Adapter,

  providers: [Google],

  events: {
    async createUser({ user }) {
      const userName = user.name;

      if (!userName) {
        throw new Error("Username is no present, this shouldn't happen!");
      }

      const splitUsername = userName.split(" ");

      let newOrgName = stripSpecialCharacters(
        (() => {
          switch (splitUsername.length) {
            case 1: {
              const [name, ..._rest] = splitUsername;

              return `${name!.toLowerCase()}`;
            }

            case 2:
            case 3: {
              const [firstName, lastName, ..._rest] = splitUsername;

              return `${firstName!
                .at(0)
                ?.toLowerCase()}${lastName!.toLowerCase()}`;
            }

            default:
              throw new Error("Couldn't create a new organization from name");
          }
        })(),
      );

      let isFirstIteration = true;
      for (;;) {
        const isNameAvailable =
          (await getOrganizationByName(db, newOrgName)).length === 0;

        if (isNameAvailable) {
          break;
        }

        if (!isFirstIteration) {
          newOrgName =
            newOrgName.slice(0, -4) + generateSeedForOrgName.toString();
        } else {
          newOrgName += generateSeedForOrgName().toString();
          isFirstIteration = false;
        }
      }

      const newOrganization = await createOrganization(
        db,
        newOrgName,
        user.id,
        true,
      );

      if (!newOrganization) {
        throw new Error("Couldn't create new organization.");
      }
    },
  },
});
