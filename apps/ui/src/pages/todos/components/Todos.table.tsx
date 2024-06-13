import { type FC } from "react";
import { useTranslation } from "react-i18next";
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
    cell: (props) => (
      <Link to={`${props.row.original.id}`}>{props.renderValue()}</Link>
    ),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    header: (props) => props.table.options.meta?.t("todosTableTitle"),
  }),
  columnHelper.accessor("description", {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    header: (props) => props.table.options.meta?.t("todosTableDescription"),
  }),
];

export interface TodosTableProps {
  todos: TodosColumnHelper[];
}

export const TodosTable: FC<TodosTableProps> = ({ todos: data }) => {
  const { t } = useTranslation();

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    meta: { t },
  });

  return (
    <>
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
              <th>{t("actions")}</th>
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
              <td>
                <Link to={`edit/${row.original.id}`}>{t("edit")}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
