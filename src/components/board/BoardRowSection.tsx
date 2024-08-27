"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import BoardRow from "@/components/board/BoardRow";

const tasksArr = [
  {
    id: 1,
    title: "random task",
    description: "this is a description",
  },
  {
    id: 1,
    title: "random task another",
    description: "this is a description",
  },
];

const dummyData = [
  {
    id: 1,
    title: "backlog",
    // target_id: 2,
    tasks_count: 0,
    tasks: tasksArr,
  },
  {
    id: 2,
    title: "to-do",
    // target_id: 2,
    tasks_count: 0,
  },
  {
    id: 3,
    title: "in-progress",
    // target_id: 2,
    tasks_count: 0,
  },
  {
    id: 4,
    title: "done",
    // target_id: 2,
    tasks_count: 0,
  },
];

const BoardRowSection = () => {
  const handleDragEnd = () => console.log("Drag ended");
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex w-full justify-between">
        {dummyData?.map((board) => (
          <BoardRow board={board} key={board.id} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardRowSection;
