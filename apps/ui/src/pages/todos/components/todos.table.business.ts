import { createColumnHelper } from "@tanstack/react-table";
import { type queryTodos } from "@/http";

export type TodosColumnHelper = Awaited<ReturnType<typeof queryTodos>>[number];

const columnHelper = createColumnHelper<TodosColumnHelper>();

export const todoColumns = [
  columnHelper.accessor("id", {}),
  columnHelper.accessor("title", {}),
  columnHelper.accessor("description", {}),
];
