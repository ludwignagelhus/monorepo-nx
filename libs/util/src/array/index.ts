import { pipe as p } from "fp-ts/function";
import * as A from "fp-ts/lib/Array";
import * as NEA from "fp-ts/NonEmptyArray";
import { without } from "ramda";
import { randNum } from "../number";

type takeRandom = <T, XS extends T[]>(xs: NEA.NonEmptyArray<T>) => [e: T, rest: T[]];
export const takeRandom: takeRandom = (xs) => {
  const e = p(xs, A.dropLeft(randNum({ max: xs.length - 1 })), NEA.head); // this NEA.head doesn't feel right...
  return [e, without([e], xs)];
};
