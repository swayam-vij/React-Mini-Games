import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col'>
      <Link to="/tictactoe">tictactoe</Link>
      <Link to="/wordle">tictactoe</Link>
      <Link to="/memoryGame">tictactoe</Link>
      <Link to="/2048">tictactoe</Link>
    </div>
  )
}

export default Home