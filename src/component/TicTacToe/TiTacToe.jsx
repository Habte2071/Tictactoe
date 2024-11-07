import React, { useState, useEffect, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
import cross1_icon from '../Assets/cross1.png'; // Image for player X
import circle1_icon from '../Assets/circle1.png'; // Image for player O

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const winnerMessageRef = useRef(null);
    const playerImageRef = useRef(null); // Ref for the congratulatory image

    const Toggle = (e, num) => {
        if (lock || data[num]) {
            return; // Prevent clicking on the same box
        }

        const currentPlayer = count % 2 === 0 ? "x" : "0";
        const currentIcon = count % 2 === 0 ? cross_icon : circle_icon;

        e.target.innerHTML = `<img src='${currentIcon}' alt='${currentPlayer}' />`;
        data[num] = currentPlayer;

        setCount(prevCount => prevCount + 1);
    };

    const resetGame = () => {
        data = ["", "", "", "", "", "", "", "", ""]; // Reset data
        setCount(0); // Reset count
        setLock(false); // Reset lock
        const boxes = document.querySelectorAll('.boxs');
        boxes.forEach(box => {
            box.innerHTML = '';
        });
        winnerMessageRef.current.textContent = ''; // Clear winner message
        playerImageRef.current.style.display = 'none'; // Hide player image
    };

    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                return won(data[a]); // Pass the winner ('x' or '0')
            }
        }

        // Check for a draw
        if (data.every(box => box)) {
            winnerMessageRef.current.textContent = "It's a draw!";
            resetGame();
        }
    };

    const won = (winner) => {
        setLock(true);
        winnerMessageRef.current.textContent = `Congratulations Player '${winner}' wins!`; // Update winner message
        winnerMessageRef.current.className = 'winner-message'; // Add class for styling
        
        // Show the appropriate congratulatory image
        if (winner === "x") {
            playerImageRef.current.src = cross1_icon; // Set image for player X
        } else {
            playerImageRef.current.src = circle1_icon; // Set image for player O
        }
        playerImageRef.current.className = 'congrats-image'; // Add class for styling
        playerImageRef.current.style.display = 'block'; // Show player image
    };
    // Check for a win after each turn
    useEffect(() => {
        checkWin();
    }, [count]);

    return (
        <div className='container'>
            <h1 className='title'>
                TicTacToe Game<span>By Daniel Elias</span>
            </h1>
            <h2 ref={winnerMessageRef} className='winner-message'></h2>
            <img 
                ref={playerImageRef} 
                src="" 
                alt="Congratulations!" 
                style={{ display: 'none', width: '200px', marginTop: '20px' }} // Adjust size and margin as needed
            />
            <div className='board'>
                <div className='row1'>
                    <div className='boxs' onClick={(e) => Toggle(e, 0)}></div>
                    <div className='boxs' onClick={(e) => Toggle(e, 1)}></div>
                    <div className='boxs' onClick={(e) => Toggle(e, 2)}></div>
                </div>
                <div className='row2'>
                    <div className='boxs' onClick={(e) => Toggle(e, 3)}></div>
                    <div className='boxs' onClick={(e) => Toggle(e, 4)}></div>
                    <div className='boxs' onClick={(e) => Toggle(e, 5)}></div>
                </div>
                <div className='row3'>
                    <div className='boxs' onClick={(e) => Toggle(e, 6)}></div>
                    <div className='boxs' onClick={(e) => Toggle(e, 7)}></div>
                    <div className='boxs' onClick={(e) => Toggle(e, 8)}></div>
                </div>
            </div>
            <button className='reset' onClick={resetGame}>Restart Game</button>
            
        </div>
    );
};

export default TicTacToe;