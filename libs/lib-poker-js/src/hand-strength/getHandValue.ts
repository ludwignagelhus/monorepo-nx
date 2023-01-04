import * as fpStdR from "fp-ts-std/Record";
import * as A from "fp-ts/Array";
import { append, findFirst, size } from "fp-ts/lib/Array";
import { flow as f, pipe as p } from "fp-ts/lib/function";
import { unprepend } from "fp-ts/lib/ReadonlyNonEmptyArray";
import * as NEA from "fp-ts/NonEmptyArray";
import { groupBy, NonEmptyArray } from "fp-ts/NonEmptyArray";
import * as O from "fp-ts/Option";
import { assoc, difference, drop, equals, prop, reduceWhile } from "ramda";
import { first, maxBy } from "remeda";
import { Card, partitionByRank, sortByRank } from "../shared/card";
import { ConfigHandStrength } from "./shared";

/* TODO: test this interface? */
/* Tests against getWinners for omaha would test everything? */

/* Get winner at showdown in Omaha: */
/* 1. get each players hand value: */
/*   1.1. for each player: findHandValue */
/*   1.2. find permutation with highest hand value. */
/* 2. find index of winning hand(s). */

type getHandValue = (arg: {
  holeCards: NonEmptyArray<Card>;
  communityCards: Card[];
  config?: ConfigHandStrength;
}) => PokerHand;
export const getHandValue: getHandValue = (arg) => {
  /* Will use handComparator in here? Or just use getWinners directly? */
  /* What if a players hole cards yield multiple winner combos? */
  /*   -> community cards have presedence. */

  /* Disable permutation stuff (for omaha etc.) for now. */

  // const permuations = getPermutations(arg.holeCards);
  // const possibleHands = permuations.map((p) =>
  //   getHandValueHelper(NEA.concat(arg.communityCards)(p))
  // );
  // console.log(possibleHands);
  // const strongestValue = possibleHands.reduce(
  //   (ac, h) => (handComparator(h, ac) === 1 ? h : ac),
  //   possibleHands[0]
  // );
  // return strongestValue;
  return getHandValueHelper(NEA.concat(arg.holeCards)(arg.communityCards));
};

/* Think if this stuff make sense. */
type getPermutations = <T>(xs: T[]) => Array<[T, T]>;
const getPermutations: getPermutations = (xs) => {
  if (xs.length === 0) return [];
  // else
  const tail = drop(1, xs);
  const head = first(xs);

  type T = typeof head;
  const perms = tail.reduce((ac: [T, T][], e: T) => [...ac, [head, e]] as [T, T][], []);
  return [...perms, getPermutations(tail)] as typeof perms;
};

type getCardPermutations = (
  cards: NonEmptyArray<Card>,
  nCardsInPermutation: number
) => NonEmptyArray<NonEmptyArray<Card>>;
const getCardPermutations = (hole) => {
  const perms = [];
  return perms;
};

export type PokerHand = { kind: HandName; cards: NonEmptyArray<Card> };
export type HandName =
  | "royalFlush"
  | "straightFlush"
  | "fourOfAKind"
  | "fullHouse"
  | "flush"
  | "straight"
  | "threeOfAKind"
  | "twoPair"
  | "pair"
  | "highCard";

type GetHandValueHelper = (cards: NonEmptyArray<Card>) => PokerHand;
export const getHandValueHelper: GetHandValueHelper = (cards) => {
  const handResolvers = [
    findRoyalFlush,
    findStraightFlush,
    findFourOfAKind,
    findFullHouse,
    findFlush,
    findStraight,
    findThreeOfAKind,
    findTwoPair,
    findPair,
  ];

  return p(
    handResolvers,
    reduceWhile(O.isNone, (_v, fn) => fn(cards), O.none),
    O.getOrElse(() => getHighCards(cards))
  );
};

const findRoyalFlush: MadeHandResolver = (cards) => {
  return p(
    findStraightFlush(cards),
    O.filter(f(prop("cards"), NEA.head, prop("rank"), equals(14))),
    O.map(assoc("kind", "royalFlush"))
  );
};

type MadeHandResolver = (cards: NonEmptyArray<Card>) => O.Option<PokerHand>;

const findStraightFlush: MadeHandResolver = (cards) => {
  return p(
    cards,
    groupBy(prop("suit")),
    fpStdR.values,
    A.findFirst((suitp) => suitp.length >= 5),
    O.chain(findStraight),
    O.map(assoc("kind", "straightFlush"))
  );
};

const findFourOfAKind: MadeHandResolver = (cards) =>
  p(
    cards,
    partitionByRank,
    A.findFirst(f(size, equals(4))),
    O.map((foakCards) => ({
      kind: "fourOfAKind",
      cards: p(foakCards, append(maxBy(cards, prop("rank")))),
    }))
  );

const findFullHouse: MadeHandResolver = (cards) =>
  p(
    O.Do,
    O.bind("twos", () => p(cards, partitionByRank, findFirst(f(size, equals(2))))),
    O.bind("threes", () => p(cards, partitionByRank, findFirst(f(size, equals(3))))),
    O.map(({ threes, twos }) => ({ kind: "fullHouse", cards: NEA.concat(twos)(threes) }))
  );

const findFlush: MadeHandResolver = (cards) =>
  p(
    cards,
    groupBy(prop("suit")),
    fpStdR.values,
    A.findFirst((gs) => gs.length >= 5),
    O.map(
      f(sortByRank, A.takeLeft(5), (flush) => ({
        kind: "flush",
        cards: p(flush, NEA.of, NEA.flatten),
      }))
    )
  );

const findStraight: MadeHandResolver = (cards) => {
  return p(
    cards,
    sortByRank,
    unprepend,
    ([x, xs]) =>
      xs.reduce((cs, c) => {
        if (cs.length === 5 || c.rank === NEA.last(cs).rank) return cs;
        if (c.rank + 1 === NEA.last(cs).rank) return append(c)(cs);
        return NEA.of(c);
      }, NEA.of(x)),
    // Can be made terser?
    // This is a nice example of nested (non-mandatory/shouldn't "short circuit" whole chain) optional operations?
    /* A "failable" operation in a chain, which is only done if some predicate passes. */
    (xs) => {
      if (xs.length === 4 && NEA.last(xs).rank === 2) {
        /* Could be more functional with `ap`? ap1? ¯\_(ツ)_/¯ Also getOrElse? */
        const ace = cards.find(f(prop("rank"), equals(14)));
        if (ace) return append(ace)(xs);
      }
      return xs;
    },
    O.fromPredicate((cards) => cards.length === 5),
    O.map((cards) => ({ kind: "straight", cards }))
  );
};

const findThreeOfAKind: MadeHandResolver = (cards) =>
  p(
    cards,
    partitionByRank,
    A.findFirst(f(size, equals(3))),
    O.map((three) => ({
      kind: "threeOfAKind",
      cards: NEA.concat(p(difference(cards, three), sortByRank, A.takeLeft(2)))(three),
    }))
  );

const findTwoPair: MadeHandResolver = (cards) =>
  p(
    cards,
    partitionByRank,
    A.filter(f(size, equals(2))),
    A.takeLeft(2),
    O.fromPredicate(f(size, equals(2))),
    O.map((pairs) => {
      const pCards = A.flatten(pairs);
      const rest = difference(cards, pCards) as NEA.NonEmptyArray<Card>;
      return {
        kind: "twoPair",
        cards: A.append(p(rest, sortByRank, NEA.head))(pCards),
      };
    })
  );

const findPair: MadeHandResolver = (cards) =>
  p(
    cards,
    partitionByRank,
    f(findFirst(f(size, equals(2)))),
    O.map((pair) => ({
      kind: "pair",
      cards: NEA.concat(p(difference(cards, pair), sortByRank, A.takeLeft(3)))(pair),
    }))
  );

type getHighCards = (cards: NonEmptyArray<Card>) => PokerHand;
const getHighCards: getHighCards = (cards) => {
  return {
    kind: "highCard",
    cards: p(cards, sortByRank, A.takeLeft(5)) as NonEmptyArray<Card>,
  };
};
