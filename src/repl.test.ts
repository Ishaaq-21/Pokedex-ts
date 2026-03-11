import { cleanInput } from "./repl.js";

import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "hello",
    expected: ["hello"],
  },
  {
    input: "   ",
    expected: [],
  },
  {
    input: "one   two    three",
    expected: ["one", "two", "three"],
  },
  {
    input: " hello world ",
    expected: ["hello", "world"],
  },
  {
    input: "",
    expected: [],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`should return ${JSON.stringify(expected)}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);

    for (let i = 0; i < expected.length; i++) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
