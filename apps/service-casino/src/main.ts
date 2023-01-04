import { PokerTable } from "@banano-casino/lib-poker-js";
import { createServer as createHttpServer } from "http";
import * as sockjs from "sockjs";

type RoomName = string;
type Rooms = Record<RoomName, sockjs.Connection[]>;

// Cashgame and tournament tables needn't be in different objects?
// Instead, tournament tables can be in same "table" as cash game tables, but keep
// a collection of tournament... objects?

// Tournament objs contains all neccessary data about the given tournament.

// Share this type on client and server...?
type Casino = {
  users: {};
  tables: Record<PokerTable["id"], PokerTable>;
  tournaments: Record<PokerTable["id"], PokerTable>;
  // blackjack: {}; // etc.
};

/* possible to have clients subscribe to a part of an object? */
/* no... instead, clients will join "rooms". */
/* A flow for when some state is updated: */
/* - get action */
/* - update state with action */
/* - check which clients are in the room for which this action is relevant. */
/*     info in (root) action used for determining which table to update, can also be used */
/*     to route messages to rooms. */
const ws = sockjs.createServer();
const conns: sockjs.Connection[] = [];

/* One object for the entire app? */
const Casino: Casino = {
  tables: {},
  tournaments: {},
  users: [],
};

const rooms: Rooms = {};

/* TODO: create wrapper fn to write to conns on backend too. */
/* Same pattern as front end. */

ws.on("connection", (conn) => {
  /* Potentially validate data? */
  /* Ie. only allow action of valid type and format. */
  /* Hmmm... maybe not that important with outgoing data; more important for incoming data. */
  const write = (data: any) => conn.write(JSON.stringify(data));

  write("hello");

  console.log("Client connected.");
  conns.push(conn);

  conn.on("data", (m) => {
    console.log("\nfrom client:");
    console.log(JSON.parse(m));

    /* So from here... */
    /* - pass action to right fn. */
    /* - respond with right data somehow? */
  });
});

/* TODO: setup authn & authz. */

const httpServer = createHttpServer();
ws.installHandlers(httpServer);
httpServer.listen(4205);
