import { type FC } from "react";
import { Link } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type queryTodos } from "@/http";

type TodosColumnHelper = Awaited<ReturnType<typeof queryTodos>>[number];

const columnHelper = createColumnHelper<TodosColumnHelper>();

const columns = [
  columnHelper.accessor("title", {
    cell: (props) => <Link to={props.row.id}>{props.renderValue()}</Link>,
  }),
  columnHelper.accessor("description", {}),
];

export interface TodosTableProps {
  todos: TodosColumnHelper[];
}

export const TodosTable: FC<TodosTableProps> = ({ todos: data }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
