import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 } from "uuid";

import { BoardColumnType, TaskType } from "@/types";

export type BoardState = {
  boardColumns: BoardColumnType[];
  addTask: (columnId: string, task: Omit<TaskType, "id">) => void;
  moveTask: (sourceId: string, destinationId: string, taskId: string) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  editTask: (
    columnId: string,
    taskId: string,
    editedTask: Omit<TaskType, "id">
  ) => void;
};

const boardColumns = [
  { id: "backlog", title: "Backlog", tasks: [] },
  { id: "to-do", title: "To do", tasks: [] },
  { id: "in-progress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
];
const uuId = v4();
export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boardColumns: boardColumns,
      addTask: (columnId, task) =>
        set((state) => {
          const newTask = {
            id: uuId,
            title: task.title,
            description: task.description,
          };
          const newBoardColumns = state.boardColumns.map((column) =>
            column.id === columnId
              ? { ...column, tasks: [...column.tasks, newTask] }
              : column
          );
          return { boardColumns: newBoardColumns };
        }),
      moveTask: (sourceId, destinationId, taskId) =>
        set((state) => {
          const sourceColumn = state.boardColumns.find(
            (column) => column.id === sourceId
          );
          const destinationColumn = state.boardColumns.find(
            (column) => column.id === destinationId
          );
          if (!sourceColumn || !destinationColumn) {
            return { boardColumns: [...state.boardColumns] };
          }
          const task = sourceColumn.tasks.find((item) => item.id === taskId);
          if (!task) {
            return { boardColumns: [...state.boardColumns] };
          }
          sourceColumn.tasks = sourceColumn.tasks.filter(
            (item) => item.id !== taskId
          );
          destinationColumn.tasks = [...destinationColumn.tasks, task];

          const updatedBoardColumns = state.boardColumns.map((column) => {
            if (column.id === sourceId) return sourceColumn;
            if (column.id === destinationId) return destinationColumn;
            return column;
          });
          return { boardColumns: updatedBoardColumns };
        }),
      deleteTask: (columnId, taskId) =>
        set((state) => {
          const updatedBoardColumns = state.boardColumns.map((column) =>
            column.id === columnId
              ? {
                  ...column,
                  tasks: column.tasks.filter((item) => item.id !== taskId),
                }
              : column
          );
          return { boardColumns: updatedBoardColumns };
        }),
      editTask: (columnId, taskId, editedTask) =>
        set((state) => {
          const updatedColumns = state.boardColumns.map((column) =>
            column.id === columnId
              ? {
                  ...column,
                  tasks: column.tasks.map((item) =>
                    item.id === taskId
                      ? {
                          ...item,
                          title: editedTask.title,
                          description: editedTask.description,
                        }
                      : item
                  ),
                }
              : column
          );
          return { boardColumns: updatedColumns };
        }),
    }),
    {
      name: "board-storage",
    }
  )
);
