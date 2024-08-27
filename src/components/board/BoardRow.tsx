"use client";

import { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "@/components/board/Task";

type BoardRowProps = {
  board: any;
};

const BoardRow: FC<BoardRowProps> = ({ board }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col">
      <h2 className="font-bold text-lg mb-4">{board.title}</h2>
      <Droppable droppableId={board.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {board?.tasks?.map((task: any, index: number) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default BoardRow;
