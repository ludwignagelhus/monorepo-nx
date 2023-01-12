import { PokerGameConfig, TableConfig } from "@banano-casino/lib-poker-js";

const gameConfig: PokerGameConfig = {
  variant: "holdem",
  blinds: [0.5, 1],
  rake: 0.15,
  buyin: { max: 100, min: 40, normal: 100 },
  bettingLimit: "no-limit",
  seats: 6,
};

/* Are "practices"/conventions a thing with data modeling? */
/* Practices for modeling authorization for things? */

export const tableConfigs: TableConfig[] = [
  {
    access: "open",
    spectatable: true,
    admins: [],
    gameConfig,
    id: "",
    name: "Amazonas",
    owner: "",
  },
  {
    access: "open",
    spectatable: true,
    admins: [],
    gameConfig,
    id: "",
    name: "Black Forest",
    owner: "",
  },
  {
    access: "open",
    spectatable: true,
    admins: [],
    gameConfig,
    id: "",
    name: "Congo Jungle",
    owner: "",
  },
];
