import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Lobby } from "./lib/Lobby";
import { Table } from "./lib/Table";

export function App() {
  return (
    <>
      <div className="flex flex-row gap-10 m-5" role="navigation">
        <Link to="table">Table</Link>
        <Link to="lobby">Lobby</Link>
      </div>

      <Routes>
        // "/" goes to page/component(s) being developing.
        <Route path="/" element={<Navigate to="table" />} />
        <Route path="table" element={<Table config={{}} seats={[]} />} />
        <Route path="lobby" element={<Lobby />} />
      </Routes>
    </>
  );
}
