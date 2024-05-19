import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './components/Board'
import ColumnButtons from './components/ColumnButtons'

function App() {
  const [board, setBoard] = useState([
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ])

  const [isP1, setIsP1] = useState(true)

  const onColumnSelect = (columnIndex) => {
    for(let rowIndex = board.length - 1; rowIndex>=0; rowIndex--){
      if(board[rowIndex][columnIndex] === 0){
          // Make a copy of the board
          const newBoard = board.map(row => [...row]);
  
          // Update the copied board
          newBoard[rowIndex][columnIndex] = isP1 ? 1 : 2; 

          // Set the new board state
          setBoard(newBoard);
          setIsP1(prevIsP1 => !prevIsP1)
          break;
      }
    }
  }
  return (
    <>

      <h1>Connect-4</h1>
      <ColumnButtons boardArr={board} onColumnSelect={onColumnSelect}/>
      <Board boardArr={board}/>
    </>
  )
}

export default App
