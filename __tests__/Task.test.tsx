import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Draggable } from "react-beautiful-dnd";
import { create } from "zustand";
import { act } from "react";

import { useBoardStore } from "@/store/board-store";
import Task from "@/components/board/Task";

jest.mock("@/store/board-store", () => {
  const actual = jest.requireActual("zustand");

  return {
    __esModule: true,
    ...actual,
    useBoardStore: jest.fn(),
  };
});

jest.mock("react-beautiful-dnd", () => ({
  Draggable: jest.fn(({ children }: any) =>
    children({ innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} })
  ),
}));

describe("Task Component", () => {
  let store: any;
  let mockDeleteTask: jest.Mock;

  beforeEach(() => {
    mockDeleteTask = jest.fn();

    store = create(() => ({
      boardColumns: [
        {
          id: "column-1",
          title: "Test Column",
          tasks: [
            {
              id: "task-1",
              title: "Test Task",
              description: "This is a test task description.",
            },
          ],
        },
      ],
      deleteTask: mockDeleteTask,
    }));

    (useBoardStore as unknown as jest.Mock).mockImplementation(store);
  });

  const columnId = "column-1";

  it("renders task title and description", () => {
    const taskFromStore = store.getState().boardColumns[0].tasks[0];
    render(<Task task={taskFromStore} itemIndex={0} columnId={columnId} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test task description.")
    ).toBeInTheDocument();
  });

  it("opens the popup", () => {
    const taskFromStore = store.getState().boardColumns[0].tasks[0];
    render(<Task task={taskFromStore} itemIndex={0} columnId={columnId} />);

    fireEvent.click(screen.getByTestId("three-dot-wrap"));

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("enters edit mode when 'Edit' is clicked", () => {
    const taskFromStore = store.getState().boardColumns[0].tasks[0];
    render(<Task task={taskFromStore} itemIndex={0} columnId={columnId} />);

    fireEvent.click(screen.getByTestId("three-dot-wrap"));
    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Update Task")).toBeInTheDocument();
  });

  it("deletes the task when 'Delete' is clicked", async () => {
    const taskFromStore = store.getState().boardColumns[0].tasks[0];
    render(<Task task={taskFromStore} itemIndex={0} columnId={columnId} />);

    fireEvent.click(screen.getByTestId("three-dot-wrap"));
    fireEvent.click(screen.getByText("Delete"));

    expect(mockDeleteTask).toHaveBeenCalledWith(columnId, taskFromStore.id);

    store.setState((state: any) => ({
      boardColumns: state.boardColumns.map((column: any) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.filter((t: any) => t.id !== taskFromStore.id),
            }
          : column
      ),
    }));

    await waitFor(() => {
      expect(screen.queryByText("Mocked Task Title")).not.toBeInTheDocument();
    });
  });
});
