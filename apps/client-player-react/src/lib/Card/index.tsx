import * as poker from "@banano-casino/lib-poker-js";
import { Suit } from "@banano-casino/lib-poker-js";
import srcClubs from "./clubs.svg";
import srcDiamonds from "./diamonds.svg";
import srcHearts from "./hearts.svg";
import srcMonkey from "./monkey.svg";
import srcSpades from "./spades.svg";

/* Meeehh... don't want to take undefined. */
const getImage = (s: Suit | undefined) => {
  switch (s) {
    case "clubs":
      return srcClubs;
    case "diamonds":
      return srcDiamonds;
    case "hearts":
      return srcHearts;
    case "spades":
      return srcSpades;
    default:
      return srcMonkey; // should be fn based on users setting? user can choose deck design.
    // also allow users to create their own decks at some point? waaay down the line, though.
  }
};

const getCardText = (rank: poker.Card["rank"]) => {
  if (rank === 11) return "J";
  if (rank === 12) return "Q";
  if (rank === 13) return "K";
  if (rank === 14) return "A";
  return rank.toString();
};

/* Can props be both suit and value or neither? */
/* Can be Card type from poker-pkg? */
type Props = {
  suit?: Suit | null;
  value?: number | null;
};

/* TODO: add animation when dealing cards. */
/* framer motion divs? */

/* TODO: copy design of poker stars cards; ie large number, small suit icons? */
export const Card = ({ suit, value }: Props) => {
  /* TODO: initially just use some random deck from internet. */
  const isFaceDown = (!!suit && !!value) === false;

  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: ".1rem",
        boxSizing: "content-box",
        width: "4rem",
        height: "6rem",
      }}
      className="bg-white"
    >
      {isFaceDown ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "gray",
            width: "100%",
            height: "100%",
          }}
        >
          <img style={{ width: "2rem", height: "3rem" }} src={srcMonkey} />
        </div>
      ) : (
        <div style={{ height: "inherit", position: "relative", width: "inherit" }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              left: ".1rem",
              position: "absolute",
              top: "-.2rem",
            }}
          >
            {value && getCardText(value)}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <img
              style={{ margin: "auto", paddingTop: "0.4rem", maxWidth: "60%", maxHeight: "100%" }}
              src={getImage(suit!)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
