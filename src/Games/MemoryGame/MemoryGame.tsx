import Board from "./Board";

const MemoryGame = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-stone-900">
      <h1 className="text-4xl font-bold text-purple-600">MEMORY GAME</h1>
      <Board />
    </div>
  );
};

export default MemoryGame;
