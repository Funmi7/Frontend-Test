import { act } from "react";
import { useBoardStore } from "@/store/board-store";

describe("Board Store", () => {
  beforeEach(() => {
    act(() => {
      useBoardStore.setState({
        boardColumns: [
          { id: "column-1", title: "To Do", tasks: [] },
          { id: "column-2", title: "In Progress", tasks: [] },
        ],
      });
    });
  });

  test("addTask adds a new task to the specified column", () => {
    const { addTask, boardColumns } = useBoardStore.getState();

    const mockTaskData = {
      title: "New Task",
      description: "This is a test task description.",
    };
    act(() => {
      addTask("column-1", mockTaskData);
    });

    const updatedColumns = useBoardStore.getState().boardColumns;
    expect(updatedColumns[0].tasks).toHaveLength(1);
    expect(updatedColumns[0].tasks[0].title).toBe("New Task");
  });

  test("moveTask moves a task from one column to another", () => {
    const { addTask, moveTask } = useBoardStore.getState();

    const mockMoveData = {
      title: "Task to Move",
      description: "This is a test task description.",
    };
    act(() => {
      addTask("column-1", mockMoveData);
      moveTask("column-1", "column-2", "1", 0, 0);
    });

    const updatedColumns = useBoardStore.getState().boardColumns;
    expect(updatedColumns[0].tasks).toHaveLength(0);
    expect(updatedColumns[1].tasks).toHaveLength(1);
    expect(updatedColumns[1].tasks[0].title).toBe("Task to Move");
  });

  test("editTask updates the content of an existing task", () => {
    const { addTask, editTask } = useBoardStore.getState();

    const mockEditData = {
      title: "Task to Edit",
      description: "This is a test task description.",
    };
    const mockEditedData = {
      title: "Edited Task",
      description: "This is a test task description.",
    };

    act(() => {
      addTask("column-1", mockEditedData);

      editTask(
        "column-1",
        useBoardStore.getState().boardColumns[0].tasks[0].id,
        mockEditedData
      );
    });

    const updatedColumns = useBoardStore.getState().boardColumns;
    expect(updatedColumns[0].tasks[0].title).toBe("Edited Task");
  });

  test("deleteTask removes a task from the column", () => {
    const { addTask, deleteTask } = useBoardStore.getState();

    const mockEditedData = {
      title: "Task to Delete",
      description: "This is a test task description.",
    };
    act(() => {
      addTask("column-1", mockEditedData);
      deleteTask(
        "column-1",
        useBoardStore.getState().boardColumns[0].tasks[0].id
      );
    });

    const updatedColumns = useBoardStore.getState().boardColumns;
    expect(updatedColumns[0].tasks).toHaveLength(0);
  });
});
