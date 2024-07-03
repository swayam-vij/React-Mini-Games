import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TicTacToe from './Games/TicTacToe/TicTacToe'
import Wordle from './Games/Wordle/Wordle'
import MemoryGame from './Games/MemoryGame/MemoryGame'
import TwoZeroFourEight from './Games/2048/TwoZeroFourEight'
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