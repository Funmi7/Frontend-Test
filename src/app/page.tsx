import BoardSection from "@/components/board/Board";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-2xl font-bold mb-4">Task Management Board</h1>
      <BoardSection />
    </main>
  );
}
