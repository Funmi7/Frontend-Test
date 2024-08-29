import { render, screen, fireEvent } from "@testing-library/react";
import { Droppable } from "react-beautiful-dnd";
import { create } from "zustand";

import { useBoardStore } from "@/store/board-store";
import BoardColumn from "@/components/board/BoardColumn";
import { BoardColumnType } from "@/types";

jest.mock("@/store/board-store", () => {
  const actual = jest.requireActual("zustand");
  return {
    __esModule: true,
    ...actual,
    useBoardStore: jest.fn(),
  };
});

jest.mock("@/components/board/Task", () =>
  jest.fn(() => <div>Mocked Task</div>)
);
jest.mock("@/components/board/AddTaskInput", () =>
  jest.fn(() => <div>Mocked TaskInput</div>)
);

jest.mock("react-beautiful-dnd", () => ({
  Droppable: jest.fn(({ children, ...rest }: any) =>
    children({
      innerRef: jest.fn(),
      droppableProps: rest,
      placeholder: <div>Placeholder</div>,
    })
  ),
}));

describe("BoardColumn Component", () => {
  let store: any;

  beforeEach(() => {
    store = create(() => ({
      boardColumns: [
        {
          id: "column-1",
          title: "To Do",
          tasks: [
            { id: "task-1", title: "Task 1", description: "Description 1" },
            { id: "task-2", title: "Task 2", description: "Description 2" },
          ],
        },
      ],
      addTask: jest.fn(),
      deleteTask: jest.fn(),
    }));

    (useBoardStore as unknown as jest.Mock).mockImplementation(() =>
      store.getState()
    );

    jest
      .spyOn(global, "requestAnimationFrame")
      .mockImplementation((cb: any) => cb(0));
    jest.spyOn(global, "cancelAnimationFrame").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the column title and tasks correctly from the store", () => {
    const columnFromStore: BoardColumnType = store.getState().boardColumns[0];

    render(<BoardColumn column={columnFromStore} />);
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getAllByText("Mocked Task").length).toBe(2);
  });

  it("renders the TaskInput component when in input mode", () => {
    const columnFromStore: BoardColumnType = store.getState().boardColumns[0];

    render(<BoardColumn column={columnFromStore} />);
    fireEvent.click(screen.getByText("Add New Task"));
    expect(screen.getByText("Mocked TaskInput")).toBeInTheDocument();
  });

  it("integrates correctly with Droppable from react-beautiful-dnd", () => {
    const columnFromStore: BoardColumnType = store.getState().boardColumns[0];

    render(<BoardColumn column={columnFromStore} />);

    expect(Droppable).toHaveBeenCalledWith(
      expect.objectContaining({
        droppableId: columnFromStore.id,
      }),
      expect.anything()
    );

    expect(screen.getByText("Placeholder")).toBeInTheDocument();
  });
});
