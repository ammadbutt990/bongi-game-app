import React, { useState, useEffect } from 'react';
import BingoTile from './BingoTile';
import Confetti from './Confetti';
import { generateBoard, checkBingo } from '../utils/bingoUtils';
import winAudio from '../assets/audio/win-sound.wav';
import DiceRoll from './DiceRoll';

const phrases = [
  "You're on mute", "Can you hear me?", "Let's take this offline",
  "Sorry, go ahead", "Awkward silence", "Is everyone here?",
  "Let’s circle back", "You're breaking up", "Quick question",
  "Sorry, I was on mute", "I had connection issues", "Sorry, couldn’t log in",
  "Let’s give them a few more minutes", "Can you repeat that?",
  "Let me share my screen", "Can you see this?",
  "You're frozen", "Let's schedule a follow-up",
  "Sorry I was late", "We lost you for a sec",
  "Let's take a 5 min break", "Sorry, you first",
  "Let's align on that", "We’re running out of time"
];

function BingoBoard() {
  const [board, setBoard] = useState<{ phrase: string; number: number }[][]>([]);
  const [marked, setMarked] = useState<boolean[][]>([]);
  const [hasBingo, setHasBingo] = useState(false);
  const [diceValue, setDiceValue] = useState<number>(0);
  const [usedNumbers, setUsedNumbers] = useState<Set<number>>(new Set());
  const [canRoll, setCanRoll] = useState(true);


  const rollDice = () => {
    if (!canRoll) return;

    const available = Array.from({ length: 24 }, (_, i) => i + 1)
      .filter(n => !usedNumbers.has(n));

    if (available.length === 0) return;

    const roll = available[Math.floor(Math.random() * available.length)];
    setDiceValue(roll);
    setCanRoll(false);
  };

  useEffect(() => {
    if (hasBingo) {
      const audio = new Audio(winAudio);
      audio.play();
    }
  }, [hasBingo]);

  useEffect(() => {
    const seed = new Date().toDateString();
    const board = generateBoard(phrases, seed);
    setBoard(board);

    const initialMarked = board.map(row =>
      row.map(tile => tile.phrase === 'FREE SPACE')
    );
    setMarked(initialMarked);
  }, []);

  const handleClick = (row: number, col: number) => {
    const tile = board[row][col];
    if (tile.phrase === "FREE SPACE" || tile.number === diceValue) {
      if (marked[row][col]) return;

      const newMarked = marked.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? true : cell))
      );
      setMarked(newMarked);

      if (tile.number === diceValue && !usedNumbers.has(diceValue)) {
        setUsedNumbers(prev => new Set(prev).add(diceValue));
        setCanRoll(true); // Now user can roll again
      }

      if (checkBingo(newMarked)) setHasBingo(true);
    }
  };

  return (
    <div className="text-center px-4">
      <DiceRoll value={diceValue} roll={rollDice} disabled={!canRoll} />
      {board.length > 0 && marked.length > 0 && (
        <div className="grid grid-cols-5 gap-2 w-full max-w-md mx-auto">
          {board.flat().map((tile, idx) => {
            const row = Math.floor(idx / 5);
            const col = idx % 5;

            return (
              <BingoTile
                key={idx}
                tileNumber={tile.number}
                phrase={tile.phrase}
                marked={marked[row][col]}
                onClick={() => handleClick(row, col)}
                disabled={tile.phrase !== 'FREE SPACE' && tile.number !== diceValue}
                highlight={tile.number === diceValue && !marked[row][col]}
              />
            )
          })}
        </div>
      )}
      {hasBingo && <Confetti />}
    </div>
  );
}

export default BingoBoard;