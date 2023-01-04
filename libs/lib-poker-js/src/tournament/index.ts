/* Is this needed on the client at all? */
/* Yeah, some things are; */
/* - tournament ticket */
/* - leaderboard */
/* - etc etc */

/* Logic: */
/* - move a player to a table A, if table A has 2 players less than the table with the most players. */
/* - disolve a table to make */

/* User stories */
/* - recurring tournaments */

type TournamentConfig = {
  buyin: number; // price of entry
  rebuyPeriod: {
    rebuys: number; // number of times a player can rebuy
    price: number | null;
    length: number; // mins after start
  };
  breaks: {
    interval: number; // minutes
    length: number; // minutes
  };
  addon: {
    enabled: boolean;
    chips: number;
    availableAfter: number; // mins after start
    cutoff: number; // mins after start
  };
  bounty: {
    isEnabled: boolean;
    buyinPart: boolean;
    /* Ie. when a player is knocked out, a part of their bounty is added to the player who knocked them out. */
    progressive: boolean;
  };

  // gameplay related
  timebank: {
    initial: number; // seconds
    breakRefill: {
      value: boolean;
      amount: number; // number of seconds to add
    };
  };
  pokerConfig: PokerConfig["id"];
};
const TounamentConfig: (arg: Partial<TournamentConfig>) => TournamentConfig = (
  arg: Partial<TournamentConfig>
) => {
  return {
    foo: "bar",
  };
};

type Tournament = {
  id: string;
  tables: PokerTable[];
};

type TournamentTicket = {
  id: string;
  tournament: Tournament["id"];
  player: string; // player.id
  expiration: Date | null;
};

export const foo = "bar";
