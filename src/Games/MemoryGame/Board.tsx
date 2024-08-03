import Card from "./Card";
import useCards from "./hooks/useCards";

const Board = () => {
  const { cards, handleClick, resetGame, turns } = useCards();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card, index) => (
          <Card key={index} select={() => handleClick(index)} img={card.img} status={card.status} />
        ))}
      </div>
      <button
        onClick={resetGame}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors mb-4"
      >
        New Game
      </button>
      <div className="text-lg font-semibold text-purple-900">Turns: {turns}</div>
      </div>
  );
};

export default Board;
