import { identity, pipe as p } from "fp-ts/lib/function";
import { contramap } from "fp-ts/lib/Ord";
// import * as RONES from "fp-ts/lib/ReadonlyNonEmptyArray";
import { values } from "fp-ts-std/Record";
import { flow as f } from "fp-ts/lib/function";
import * as NEA from "fp-ts/NonEmptyArray";
import { groupBy } from "fp-ts/NonEmptyArray";
import * as N from "fp-ts/number";
import * as S from "fp-ts/string";
import { prop, xprod } from "ramda";

/* TODO: some fn to sort cards; should also handle the cards suit; */
/* ie. Spades -> hearts -> clubs -> diamonds */
/* Why? makes it easier to write deterministic tests. */
/* Also, means cards will always be in the same order, everywhere (all clients, server, hand-history etc.) */

/* Also, means we should really figure out how fp-ts sorting works; like really understand */
/* it -> will be doing a loooot of it. */
/* 1. How exactly do these `Ord` things work? */
/* 2. What is contramap? */

export type Card = {
  rank: number;
  suit: Suit;
};

export const Card = (rank: number, suit: Suit): Card => ({ rank, suit });

const suits = ["spades", "hearts", "clubs", "diamonds"] as const;
export type Suit = typeof suits[number];

/* Wtf... this is an Ord? Ord gives Ord? */
/* Actually, can/should probably just rename this to `Ord`. */
const byRank = p(
  N.Ord,
  contramap((c: Card) => c.rank)
);

/* TODO: probably have to write this out manually. */
const bySuit = p(
  S.Ord,
  contramap((c: Card) => c.suit)
);

/* Can actually just be named `sort`. */
export const sortByRank = f(NEA.sortBy([byRank]), NEA.reverse);
export const sortBySuit = f(NEA.sortBy([bySuit]));

type groupByRank = (a: NEA.NonEmptyArray<Card>) => NEA.NonEmptyArray<NEA.NonEmptyArray<Card>>;
export const partitionByRank: groupByRank = (cards) => {
  return p(
    cards,
    groupBy(f(prop("rank"), String)),
    values,
    NEA.sortBy([p(N.Ord, contramap(f(NEA.head, prop("rank"))))]),
    NEA.reverse
  );
};

type ArgDeck = {
  short?: boolean; // ie. short decked.
  sorted?: boolean; // Default is shuffled.
};
type Deck = (arg?: ArgDeck) => NEA.NonEmptyArray<Card>;
export const Deck: Deck = (arg = {}) =>
  p(
    xprod(NEA.range(arg.short ? 7 : 2, 14), suits),
    NEA.map(([v, s]) => Card(v, s)), // Any way to destructure and apply tuple to a binary function?
    arg.sorted ? identity : shuffle
  );

/* https://stackoverflow.com/questions/48083353/i-want-to-know-how-to-shuffle-an-array-in-typescript */
export function shuffle<T, Xs extends T[]>(array: Xs): Xs {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
