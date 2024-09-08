import type { Metadata } from "next";
import { PokeSelector } from "./components/PokeSelector/PokeSelector";
import { UsersTable } from "./components/UsersTable/UsersTable";

export default function IndexPage() {
  return (
    <div className="flex flex-col space-y-2 h-svh justify-center">
      <PokeSelector />
      <UsersTable />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Users management app",
};
