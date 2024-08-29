import React from "react";
import { render, screen } from "@testing-library/react";
import { DragDropContext } from "react-beautiful-dnd";
import BoardSection from "@/components/board/Board";
import { useBoardStore } from "@/store/board-store";

jest.mock("@/store/board-store", () => ({
  useBoardStore: jest.fn(),
}));

jest.mock("@/components/board/BoardColumn", () => {
  return function MockBoardColumn({ column }: { column: any }) {
    return <div data-testid={`board-column-${column.id}`}>{column.title}</div>;
  };
});

describe("BoardSection", () => {
  const mockBoardColumns = [
    { id: "backlog", title: "Backlog", tasks: [] },
    { id: "to-do", title: "To do", tasks: [] },
    { id: "in-progress", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ];

  const mockMoveTask = jest.fn();

  beforeEach(() => {
    (useBoardStore as unknown as jest.Mock).mockReturnValue({
      boardColumns: mockBoardColumns,
      moveTask: mockMoveTask,
    });
  });

  it("renders board columns", () => {
    render(<BoardSection />);

    mockBoardColumns.forEach((column) => {
      expect(
        screen.getByTestId(`board-column-${column.id}`)
      ).toBeInTheDocument();
      expect(screen.getByText(column.title)).toBeInTheDocument();
    });
  });
});
