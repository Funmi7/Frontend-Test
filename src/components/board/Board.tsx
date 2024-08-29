"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import BoardColumn from "@/components/board/BoardColumn";
import { useBoardStore } from "@/store/board-store";

const BoardSection = () => {
  const { boardColumns, moveTask } = useBoardStore();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    moveTask(
      source.droppableId,
      destination.droppableId,
      draggableId,
      source.index,
      destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 overflow-hidden sm:overflow-auto">
        {boardColumns?.map((column) => (
          <BoardColumn column={column} key={column.id} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardSection;
