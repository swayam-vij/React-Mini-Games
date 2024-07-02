import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TicTacToe from './Games/TicTacToe/TicTacToe'
import Wordle from './Games/Wordle'
import MemoryGame from './Games/MemoryGame'
import TwoZeroFourEight from './Games/TwoZeroFourEight'
import Home from "./Pages/Home"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<TicTacToe />}/>
        <Route path="/wordle" element={<Wordle />}/>
        <Route path="/memoryGame" element={<MemoryGame />}/>
        <Route path="/2048" element={<TwoZeroFourEight />}/>
      </Routes>
    </Router>
  )
}

export default App