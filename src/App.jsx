import { useState, useEffect } from 'react'
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
  ]);

  const [isP1, setIsP1] = useState(true);

  const [gameOver, setGameOver] = useState(false);

  const [winner, setWinner] =  useState(null);

  const onColumnSelect = (columnIndex) => {
    if (gameOver) return;

    for(let rowIndex = board.length - 1; rowIndex>=0; rowIndex--){
      if(board[rowIndex][columnIndex] === 0){
          // Make a copy of the board
          const newBoard = board.map(row => [...row]);
  
          // Update the copied board
          newBoard[rowIndex][columnIndex] = isP1 ? 1 : 2; 

          // Set the new board state
          setBoard(newBoard);
          // check for wins
          const playerNumber = isP1 ? 1 : 2;
          if (checkHorizontalWin(newBoard,rowIndex, playerNumber )){
            declareWinner(playerNumber)
          }


          setIsP1(prevIsP1 => !prevIsP1)

          break;
      }
    }
  }
// comment how this works
  const checkHorizontalWin = (board, rowIndex, player) => {
      return board[rowIndex].reduce((acc, value) => {
        if(acc.found) return acc;
        if( value === player){
          acc.count++;
          console.log(acc)
          if( acc.count === 4) {
            acc.found = true;
            console.log(`player ${player} wins!`)
          }
        } else {
          acc.count = 0;
        }
        return acc;
      },{count:0, found:false }).found;

  }
     // check for vertical win
    // check for diagonal win

  const declareWinner = (winner) => {
    setGameOver(true);
    setWinner(winner)
  }

  useEffect(()=> {
    console.log(`By the power of useEffect i delae player ${winner} the weeeeeener!`)
  },[winner])

  return (
    <>

      <h1>Connect-4</h1>
      <ColumnButtons boardArr={board} onColumnSelect={onColumnSelect}/>
      <Board boardArr={board}/>
    </>
  )
}

export default App
