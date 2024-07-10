import { Link } from 'react-router-dom';
import ticTacToeImage from "../assets/TicTcToe-Assets/tictactoe.jpg";
import wordleImage from "../assets/Wordle-assets/unwordle-play.jpg";
import memoryGameImage from "../assets/MemoryGame-Assets/brain.jpg";

const bg = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-700"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg">
        <Link
          to="/tictactoe"
          className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          <img src={ticTacToeImage} alt="Tic Tac Toe" className="w-16 h-16 mr-2" />
          Tic Tac Toe
        </Link>
        <Link
          to="/wordle"
          className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          <img src={wordleImage} alt="Wordle" className="w-16 h-16 mr-2" />
          Wordle
        </Link>
        <Link
          to="/memoryGame"
          className="flex items-center justify-center w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          <img src={memoryGameImage} alt="Memory Game" className="w-16 h-16 mr-2" />
          Memory Game
        </Link>
      </div>
    </div>
  );
};

export default Home;
