import { merge } from "fp-ts-std/Struct";

/* Does fp-ts have a mergeRight? */
export const randNum = (arg: { min?: number; max?: number }) => {
  arg = merge({ max: Number.MAX_VALUE, min: 0 })(arg);
  // unsure about the Math.floor...
  // Look for a solid implementation.
  return arg.min + Math.floor((arg.max - arg.min) * Math.random());
};
