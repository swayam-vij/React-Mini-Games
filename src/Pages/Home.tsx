import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col'>
      <Link to="/tictactoe">Tic Tac Toe</Link>
      <Link to="/wordle">Wordle</Link>
      <Link to="/memoryGame">Memory Game</Link>
      <Link to="/2048">2048</Link>
    </div>
  )
}

export default Home