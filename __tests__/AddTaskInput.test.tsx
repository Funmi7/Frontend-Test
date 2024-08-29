import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { create } from "zustand";

import TaskInput from "@/components/board/AddTaskInput";
import { useBoardStore } from "@/store/board-store";
import { TaskType } from "@/types";

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

describe("TaskInput Component", () => {
  let store: any;
  let mockEditTask: jest.Mock;
  let mockAddTask: jest.Mock;
  let mockCloseEditMode: jest.Mock;

  const columnId = "column-1";

  beforeEach(() => {
    mockAddTask = jest.fn();
    mockEditTask = jest.fn();
    mockCloseEditMode = jest.fn();

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
      addTask: mockAddTask,
      editTask: mockEditTask,
      closeEditMode: mockCloseEditMode,
    }));

    (useBoardStore as unknown as jest.Mock).mockImplementation(store);
  });

  it("renders task input fields correctly", () => {
    render(<TaskInput columnId={columnId} closeEditMode={mockCloseEditMode} />);

    expect(screen.getByPlaceholderText("Task title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task description")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("handles adding a new task", () => {
    render(<TaskInput columnId={columnId} closeEditMode={mockCloseEditMode} />);

    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Task description"), {
      target: { value: "New Description" },
    });
    fireEvent.click(screen.getByText("Add Task"));

    expect(mockAddTask).toHaveBeenCalledWith(columnId, {
      title: "New Task",
      description: "New Description",
    });
    expect(mockCloseEditMode).toHaveBeenCalled();
  });

  it("handles editing an existing task", () => {
    const taskToEdit: TaskType = {
      id: "task-1",
      title: "Existing Task",
      description: "Existing Description",
    };

    render(
      <TaskInput
        columnId={columnId}
        closeEditMode={mockCloseEditMode}
        taskToEdit={taskToEdit}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "Updated Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Task description"), {
      target: { value: "Updated Description" },
    });
    fireEvent.click(screen.getByText("Update Task"));

    expect(mockEditTask).toHaveBeenCalledWith(columnId, taskToEdit.id, {
      title: "Updated Task",
      description: "Updated Description",
    });
    expect(mockCloseEditMode).toHaveBeenCalled();
  });

  it("disables the add/update button if the title is empty", () => {
    render(<TaskInput columnId={columnId} closeEditMode={mockCloseEditMode} />);

    const addButton = screen.getByText("Add Task");
    expect(addButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "New Task" },
    });
    expect(addButton).not.toBeDisabled();
  });

  it("calls closeEditMode when cancel is clicked", () => {
    render(<TaskInput columnId={columnId} closeEditMode={mockCloseEditMode} />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockCloseEditMode).toHaveBeenCalled();
  });
});
