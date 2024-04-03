import { expect, test } from "vitest";

import { generateSeedForOrgName } from "../utils";

test("is generated seed a whole number", () => {
  const value = generateSeedForOrgName();

  expect(value % 1).lt(Number.EPSILON);
});

test("is generated seed a 4 digit number", () => {
  const value = generateSeedForOrgName();

  expect(value).gte(1000);
  expect(value).lt(10000);
});
