import { ChatMessage } from "@banano-casino/chat";
import { CasinoTable, PokerGameConfig, PokerTable, TableConfig } from "@banano-casino/lib-poker-js";
import { indexBy, prop } from "ramda";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { pipe as p } from "fp-ts/function";
import { map } from "fp-ts/lib/Array";

/* Using state machine on the client? */
/* Think yes. */

export type BananoCasino = {
  tables: Record<CasinoTable["id"], CasinoTable>;
  users: User[];
  chat: ChatMessage[];
};

/* TODO: module for this. */
type User = {};

// TODO: use something else for state management.
// nanostores?
const ContextBananoCasino = createContext<BananoCasino>(null!);

const gameConfig: PokerGameConfig = {
  variant: "holdem",
  blinds: [0.5, 1],
  rake: 0.15,
  buyin: { max: 100, min: 40, normal: 100 },
  bettingLimit: "no-limit",
  seats: 6,
};

// TODO: get these from server.
const tableConfigs: TableConfig[] = [
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

export const ProviderBananoCasino = (props: { children: ReactNode }) => {
  const [casino, setCasino] = useState({
    tables: p(tableConfigs, map(PokerTable), indexBy(prop("id"))),
    users: [],
    chat: [],
  });

  /* ws. */
  useEffect(() => {}, []);

  return (
    <ContextBananoCasino.Provider value={casino}>{props.children}</ContextBananoCasino.Provider>
  );
};

export const useTable = (id: PokerTable["id"]) => {
  const f = useContext(ContextBananoCasino);
  return f.tables[id];
};

export const useCasino = () => useContext(ContextBananoCasino);
