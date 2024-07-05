import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col'>
      <Link to="/tictactoe">Tic Tac Toe</Link>
      <Link to="/wordle">Wordle</Link>
      <Link to="/memoryGame">tictactoe</Link>
      <Link to="/2048">tictactoe</Link>
    </div>
  )
}

export default Home