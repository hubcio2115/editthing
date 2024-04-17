import { expect, test } from "vitest";

import { stripSpecialCharacters } from "../utils";

test('stripSpecialCharacters for "xx__Pu$$yD€$stroy€r__xx" return "xxPyDstroyrxx"', () => {
  const testingValue = stripSpecialCharacters("xx__Pu$$yD€$stroy€r__xx");

  expect(testingValue).toBe("xxPuyDstroyrxx");
});

test('stripSpecialCharacters for "hubcio2115" leaves it alone', () => {
  const testingValue = stripSpecialCharacters("hubcio2115");

  expect(testingValue).toBe("hubcio2115");
});

test('stripSpecialCharacters for "k-lisowski" leaves it alone', () => {
  const testingValue = stripSpecialCharacters("k-lisowski");

  expect(testingValue).toBe("k-lisowski");
});
