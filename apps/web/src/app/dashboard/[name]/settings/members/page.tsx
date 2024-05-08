"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Select, SelectItem, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "~/components/ui/select";
import { roleEnum } from "~/lib/validators/organization";
import { getMembersOfOrganization, getOwnOrganizationByName, removeMemberFromOrganization, updateMemberRole } from "~/server/actions/organization";

type SettingsMembersViewProps = {
  params: {
    name: string;
  };

};

function SettingsMembersView({ params }: SettingsMembersViewProps) {
  const session = useSession();

  const { data: organization, isFetched } = useQuery({
    queryKey: ["organization"],
    queryFn: async () => {
      const [organizations, err] = await getOwnOrganizationByName(params.name)
      if (err !== null) {
        console.error(err);
      }
      return organizations;
    }
  });

  const { data: userData, refetch } = useQuery({
    queryKey: ["members", organization?.id],
    queryFn: () => getMembersOfOrganization(organization!.id),
    enabled: !!organization?.id && isFetched,
  });



  useEffect(() => {
    refetch();
  }, [organization]);

  const handleRoleChange = async (newValue: "user" | "owner" | "admin", userId: string) => {
    await updateMemberRole({ memberId: userId, organizationId: organization!.id, role: newValue });
    refetch();
  };

  const handleRemoveMember = async (userId: string) => {
    await removeMemberFromOrganization({ memberId: userId, organizationId: organization!.id });
    refetch();
  }


  return (userData && (
    <div className="rounded-md border bg-gray-100 px-2">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="w-full text-left">
              Member
            </th>
            <th scope="col" className="whitespace-nowrap text-left">
              Role
            </th>
          </tr>
        </thead>
        <tbody >
          {
            userData!.map(({ user, usersToOrganizations }) => (
              <tr key={user?.id}>
                <td >{user?.name}</td>
                <td>
                  <Select
                    value={usersToOrganizations.role}
                    onValueChange={(newValue: "user" | "owner" | "admin") => handleRoleChange(newValue, user!.id)}
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder={usersToOrganizations.role} />
                    </SelectTrigger>

                    <SelectContent >
                      <SelectGroup >
                        {roleEnum.options.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {
                    session.data?.user.id === user?.id ?
                      <button onClick={() => { }}>Leave</button> :
                      <button onClick={() => handleRemoveMember(user!.id)}>Remove</button>
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div >
  ));
}

export default SettingsMembersView;
