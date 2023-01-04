import { randNum } from "../index";
/* Any best practices for testing things which are not pure? */

test("Random number should be between min and max.", () => {
  const arg = { min: 4, max: 10 };
  const result = randNum(arg);
  expect(result).toBeGreaterThanOrEqual(arg.min);
  expect(result).toBeLessThanOrEqual(arg.max);
});

test("Should be integer (no decimal places).", () => {
  const result = randNum({ min: 3, max: 101 });
  expect(result).toEqual(Math.floor(result));
});

test("Should return positive number when no minimum value is supplied.", () => {
  expect(randNum({ max: 10 })).toBeGreaterThanOrEqual(0);
});
