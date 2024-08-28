import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { BoardColumnType, TaskType } from "@/types";

export type BoardState = {
  boardColumns: BoardColumnType[];
  addTask: (columnId: string, task: Omit<TaskType, "id">) => void;
  moveTask: (
    sourceId: string,
    destinationId: string,
    taskId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
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

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boardColumns: boardColumns,
      addTask: (columnId, task) =>
        set((state) => {
          const newTask = {
            id: uuidv4(),
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

      moveTask: (
        sourceId,
        destinationId,
        taskId,
        sourceIndex,
        destinationIndex
      ) =>
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

          if (sourceId === destinationId) {
            const updatedTasks = Array.from(sourceColumn.tasks);
            const [movedTask] = updatedTasks.splice(sourceIndex, 1);
            updatedTasks.splice(destinationIndex, 0, movedTask);

            const updatedColumns = state.boardColumns.map((column) =>
              column.id === sourceId
                ? { ...column, tasks: updatedTasks }
                : column
            );

            return { boardColumns: updatedColumns };
          }

          const sourceTasks = Array.from(sourceColumn.tasks);
          const destinationTasks = Array.from(destinationColumn.tasks);

          const [movedTask] = sourceTasks.splice(sourceIndex, 1);
          destinationTasks.splice(destinationIndex, 0, movedTask);

          const updatedColumns = state.boardColumns.map((column) => {
            if (column.id === sourceId)
              return { ...column, tasks: sourceTasks };
            if (column.id === destinationId)
              return { ...column, tasks: destinationTasks };
            return column;
          });

          return { boardColumns: updatedColumns };
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
