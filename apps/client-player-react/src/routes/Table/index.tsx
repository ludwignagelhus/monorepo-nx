import * as poker from "@banano-casino/lib-poker-js";
import { snakeCase } from "@banano-casino/util";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../lib/Card";
import { useCasino } from "../../lib/state";
import { wsSend } from "../../ws";
import style from "./index.module.scss";

/* A few of these types can probably be imported from lib-poker-js. */
/* Can use Omit<"id", [PokerType]> when using types on the client. */

type ClientCard = { kind: "faceDown" } | ({ kind: "faceUp" } & poker.Card);

type SeatedPlayer = {
  bet?: number;
  displayName: string;
  chips: number;
  button: null | Button; // might not need? already derived.
  cards: ClientCard[];
};

type Button = "dealer" | "bigBlind" | "smallBlind";

/* Try using multiplexing thing for tables? */
/* Ie. each table/room simulates it's own connection. */

export const Table = () => {
  // read table name from url. and then...
  const { tableName } = useParams();

  // Handle this gracefully.
  if (!tableName) return <></>;

  const casino = useCasino();
  const table = Object.values(casino.tables).find((t) => snakeCase(t.name) === tableName);
  console.log(table);
  if (!table) return <></>;

  return (
    <>
      <div className={style.TableWrapper}>
        <p>{table.name}</p>
        <SeatedPlayer
          cards={[{ kind: "faceDown" }, { kind: "faceDown" }]}
          button="smallBlind"
          chips={100}
          displayName="Chad"
        />
        <SeatedPlayer
          cards={[
            { kind: "faceUp", rank: 4, suit: "spades" },
            { kind: "faceUp", rank: 4, suit: "diamonds" },
          ]}
          button="bigBlind"
          chips={100}
          displayName="Chad"
        />
        <SeatedPlayer cards={[]} button={null} chips={100} displayName="Chad" />
        <SeatedPlayer cards={[]} button="dealer" chips={100} displayName="Chad" />
      </div>
      <CommunityCards />
      <ActionPanel />
    </>
  );
};

/* Either a player is sitting in seat, or seat is empty. */

type PropsSeat = SeatedPlayer;

const SeatedPlayer = (props: PropsSeat) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className={style.Seat}>
        <p>{props.chips}</p>
        <p>{props.displayName}</p>
        {props.button && <PlayerButton kind={props.button} />}
      </div>
      {props.bet ?? 0}
      <div className="flex h-24 bg-blue-300 w-full">
        {props.cards.map((c, i) => (
          <Fragment key={i}>
            {c.kind === "faceDown" ? <Card /> : <Card suit={c.suit} value={c.rank} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const buttonLabel: Record<Button, string> = {
  dealer: "D",
  smallBlind: "SB",
  bigBlind: "BB",
};

const PlayerButton = (props: { kind: Button }) => {
  return (
    <div className={style.PlayerButton}>
      <p>{buttonLabel[props.kind]}</p>
    </div>
  );
};

/* SeatedPlayer And Empty Seat will both use the same base component. */
const EmptySeat = () => {};

const CommunityCards = () => {
  /* Maybe grid is better? */
  /* Responsiveness shiat again... */
  return (
    <div className="w-fit">
      <div className="flex p-5 gap-2 w-fit bg-orange-200">
        <Card suit="spades" value={10} />
        <Card suit="hearts" value={11} />
        <Card suit="clubs" value={12} />
        <Card suit="diamonds" value={13} />
        <Card suit="diamonds" value={14} />
      </div>
      <div className="font-bold m-2 text-center">pot: 13</div>
    </div>
  );
};

/* Here need to differentiate between bet and raise. */
const ActionPanel = () => {
  const [bet, setBet] = useState(1);

  /* Problem setting background for input. */
  /* Probably because styling comes from daisyUI... */
  /* TODO: read about theming daisyUI. */
  /* TODO: check if action is check or call. */
  /* TODO: add slider to bet amount. */
  return (
    <div className="flex gap-3">
      <button className="btn btn-accent bg-red-300" onClick={() => wsSend.check()}>
        check
      </button>
      <button className="btn btn-accent bg-red-300" onClick={() => wsSend.fold()}>
        fold
      </button>
      <button className="btn btn-accent bg-red-300" onClick={() => wsSend.raise(bet)}>
        bet
      </button>
      <input
        className="input input-bordered opacity-1 bg-white w-full max-w-xs"
        onWheel={(e) => setBet((p) => (e.deltaY < 0 ? p + 1 : Math.max(0, p - 1)))}
        onChange={(e) => {
          const n = Number.parseFloat(e.currentTarget.value);
          typeof n === "number" && setBet(n);
        }}
        value={bet}
      />
    </div>
  );
};
