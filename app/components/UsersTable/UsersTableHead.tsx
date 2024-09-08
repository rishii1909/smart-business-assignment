import { Input } from "@/components/ui/input";
import { TableHead } from "@/components/ui/table";
import { User } from "@/lib/features/users/usersAPISlice";
import { flexRender, Header, Table } from "@tanstack/react-table";
import clsx from "clsx";
import { SearchIcon } from "lucide-react";
import React, { useRef, useState } from "react";

interface UsersTableHeadProps {
  header: Header<User, unknown>;
  table: Table<User>;
}
export const UsersTableHead = ({ header, table }: UsersTableHeadProps) => {
  const [showSearch, setShowSearch] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const fieldName = header.column.columnDef.header;
  return (
    <TableHead key={header.id}>
      <div className="flex flex-row justify-between items-center w-full my-1">
        {showSearch ? (
          <Input
            ref={inputRef}
            className="flex flex-1 min-w-0 text-[0.9em] h-8 rounded-r-none border border-r-0 border-[--primary-200] placeholder:font-semibold"
            placeholder={`Search by ${fieldName}`}
            value={
              (table.getColumn(header.id)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(header.id)?.setFilterValue(event.target.value)
            }
          />
        ) : (
          <span className="text-md">
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </span>
        )}
        <SearchIcon
          className={clsx(
            "w-7 h-8 !bg-[--primary-100] px-1.5 py-1 rounded-md cursor-pointer",
            showSearch && " rounded-l-none"
          )}
          onClick={() => {
            const currentShowSearch = showSearch;
            setShowSearch(!showSearch);

            if (!currentShowSearch) inputRef.current?.focus();
          }}
        />
      </div>
    </TableHead>
  );
};
