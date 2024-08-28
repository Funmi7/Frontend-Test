"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import BoardColumn from "@/components/board/BoardColumn";
import { useBoardStore } from "@/store/board-store";

const BoardSection = () => {
  const { boardColumns, moveTask } = useBoardStore();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    moveTask(source.droppableId, destination.droppableId, result.draggableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex w-full justify-between">
        {boardColumns?.map((column) => (
          <BoardColumn column={column} key={column.id} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardSection;
