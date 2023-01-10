import * as NEA from "fp-ts/NonEmptyArray";
import { takeRandom } from "..";

/* This is a good exp for the following: */
/* - NEA as input, or Option as output? */
/* Simpler to adjust input or output? */
/* How to get from array to NEA? */

/* Currently NEA as input. */

test("Should take random element from array.", () => {
  const a: NEA.NonEmptyArray<number> = [1, 2, 3, 4];
  const [e, rest] = takeRandom([1, 2, 3, 4]);
  expect(rest.length).toEqual(3);
  expect(a).toContain(e);
});

test("Adding the random element to remaining elements should give us an array with the same values.", () => {
  const a: NEA.NonEmptyArray<number> = [1, 2, 3, 4];
  const [e, rest] = takeRandom(a);
  expect([...rest, e]).toEqual(expect.arrayContaining(a));
});

test("Should get empty list back if pass array with 1 element.", () => {
  const result = takeRandom([3]);
  expect(result).toEqual([3, []]);
});
