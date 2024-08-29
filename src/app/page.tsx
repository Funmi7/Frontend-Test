import BoardSection from "@/components/board/Board";

export default function Home() {
  return (
    <main className="flex h-auto sm:h-screen flex-col  pt-12 pb-2 px-4 md:px-12 bg-gray dark:bg-black">
      <h3 className="text-xl font-bold mb-4">Task Management Board</h3>
      <BoardSection />
    </main>
  );
}
