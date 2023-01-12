import { PokerTable } from "@banano-casino/lib-poker-js";
import { snakeCase } from "@banano-casino/util";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCasino, useTable } from "../../lib/state";
import { sock, wsSend } from "../../ws";

/* Some kinda table format? column names at the top. */

export const Lobby = () => {
  useEffect(() => {
    wsSend.lobbyJoin();
    return wsSend.lobbyLeave;
  }, [sock]);

  const casino = useCasino();

  return (
    <div className="w-full">
      <div className={"w-full flex flex-col gap-4 p-5 relative"}>
        <div className="w-full bg-blue-300 h-20"></div>
        {Object.values(casino.tables).map((t, i) => (
          <TableInList id={t.id} key={i} />
        ))}
      </div>
    </div>
  );
};

type PropsTableInList = { id: PokerTable["id"] };

const TableInList = (props: PropsTableInList) => {
  const navigate = useNavigate();
  const table = useTable(props.id);

  return (
    <div
      className="flex flex-row rounded gap-8 p-2.5 bg-base-300 hover:bg-base-200 select-none shadow-md"
      onClick={() => {
        navigate(`/table/${snakeCase(table.name)}`);
        wsSend.tableVisit(table.name);
      }}
    >
      <p style={{ fontWeight: "bold" }}>Amazonas</p>
      <p>No-limit Texas hold'em</p>
      <p>3/4</p>
    </div>
  );
};
