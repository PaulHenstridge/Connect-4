import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './components/Board'
import ColumnButtons from './components/ColumnButtons'
import DisplayPanel from './components/DisplayPanel'
import Header from './components/header'

import socket from './utils/socket'

import apiCall from './utils/openAIApiCall.js'
import ToggleAI from './components/ToggleAI'

function App() {
  const [board, setBoard] = useState([
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ]);

  const [AIOpponent , setAIOpponent] = useState(false);

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
          if (
            checkHorizontalWin(newBoard,rowIndex, playerNumber )
            ||
            checkVerticalWin(newBoard, columnIndex,playerNumber)
            ||
            checkDiagonalWin(newBoard, rowIndex, columnIndex, playerNumber)
          ){
            declareWinner(playerNumber)
            }


          setIsP1(prevIsP1 => !prevIsP1)

          break;
      }
    }
  }
// initialise reduce with an object to track the count and if a win condition is found
// reduce function will return accumulator if board becomes true
// overall function returns the final state of 'found' when acc is returned.
  const checkHorizontalWin = (board, rowIndex, player) => {
      return board[rowIndex].reduce((acc, value) => {
        if(acc.found) return acc;
        if( value === player){
          acc.count++;
          if( acc.count === 4) {
            acc.found = true;
          }
        } else {
          acc.count = 0;
        }
        return acc;
      },{count:0, found:false }).found;

  }
     // check for vertical win
    const checkVerticalWin = (board, columnIndex, player) => {
    let count = 0;
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      if (board[rowIndex][columnIndex] === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }
    return false;
    };
    // check diagonals up to 3 slots away in either direction, on both diagonals
    const checkDiagonalWin = (board, rowIndex, columnIndex, player) => {
      
      // top-left to bottom-right
      let count = 0;
      for (let i = -3; i <= 3; i++) {
        const r = rowIndex + i;
        const c = columnIndex + i;
        if (r >= 0 && r < board.length && c >= 0 && c < board[0].length) {
          if (board[r][c] === player) {
            count++;
            if (count === 4) return true;
          } else {
            count = 0;
          }
        }
      }
  
      // top-right to bottom-left
      count = 0;
      for (let i = -3; i <= 3; i++) {
        const r = rowIndex + i;
        const c = columnIndex - i;
        if (r >= 0 && r < board.length && c >= 0 && c < board[0].length) {
          if (board[r][c] === player) {
            count++;
            if (count === 4) return true;
          } else {
            count = 0;
          }
        }
      }
  
      return false;
    };

  const declareWinner = (winner) => {
    setGameOver(true);
    setWinner(winner)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (AIOpponent && !isP1 && !gameOver) {
        const response = await apiCall(board);
        console.log(response);
        onColumnSelect(response)
      }
    };

    fetchData();
  }, [board, isP1, gameOver]);

  useEffect(() => {
    if(winner !== null){
      console.log(`By the power of useEffect player ${winner} is the weeeeeener!`)
    }
  },[winner])

  //socket testing
  useEffect(() => {
    socket.on('enterLobbyResponse', data => {
        console.log('enterLobby event received ', data)
    })
    return () => {
        socket.off('enterLobby');
    }
}, [socket])

  return (
    <>
    <button onClick={() => socket.emit('enterLobby', {name:"Pies"})}>Test server response</button>
      <Header />
      <ToggleAI AIOpponent={AIOpponent} setAIOpponent={setAIOpponent}/>
      {/* {isP1 &&  */}
      <ColumnButtons boardArr={board} onColumnSelect={onColumnSelect}/>
      {/* } */}
      <Board boardArr={board}/>
      <DisplayPanel gameOver={gameOver} winner={winner} player={isP1?1:2}/>
    </>
  )
}

export default App
