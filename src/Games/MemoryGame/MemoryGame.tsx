import Board from "./Board";

const MemoryGame = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-pink-400">
      <h1 className="text-4xl font-bold text-purple-900 p-4">MEMORY GAME</h1>
      <Board />
    </div>
  );
};

export default MemoryGame;
