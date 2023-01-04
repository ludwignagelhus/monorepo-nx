import { Action, ActionName, mkAction } from "@banano-casino/lib-casino";
import { flow as f, pipe as p } from "fp-ts/lib/function";
import * as R from "fp-ts/Record";
import SockJS from "sockjs-client";

const sock = new SockJS("http://localhost:4205");
sock.onopen = function (this: WebSocket, event: Event) {
  console.log("connected to server!");
  sock.send(JSON.stringify({ foo: "bar" }));
  return null as any;
};

sock.onmessage = (e) => {
  console.log(JSON.parse(e.data));
};

sock.onclose = () => console.log("closed");

const send = <T extends Action>(data: any) => {
  sock.send(JSON.stringify(data));
};

/* = = = Actions = = = */

/* Use this template for many table actions. */

/* How will the life span for an action look like? */
/* - client: fold(table) */
/* - server: map socket toa player. */
/* - check if action requires that user is next to act. */

/* - apply action to table state if everything i ok. */
/* Consider if actions should be named actions. */
/* Are there other naming conventions for state machines? */

export const sendSimpleTableAction = (actionName: string) => (table: string) => {
  send({ kind: actionName, table });
};

export const mkSimpleAction = (actionName: string) => send({ kind: actionName });

/* Poker actions. */

/* Maybe table action creators can be wrapped in context around table? */
/* For prettier api, even though only difference is that won't need to pass table name. */

// Maybe indeed possible to type correctly, but not sure which functions would need to be used...
// Some kind of HKT? compose? extend? ¯\_(ツ)_/¯
export const wsSend = p(
  mkAction,
  R.map((fn: any) => f(fn, send))
) as { [K in ActionName]: (...args: Parameters<typeof mkAction[K]>) => void };

/* ^Avoids duplicated code such as: */
// export const reserveSeat = (table: string, seat: number) =>
//   send({ kind: "reserveSeat", table, seat });
