import React, { useState, useEffect } from 'react';
import BingoTile from './BingoTile';
import Confetti from './Confetti';
import { generateBoard, checkBingo } from '../utils/bingoUtils';
import winAudio from '../assets/audio/win-sound.wav';

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
  const [board, setBoard] = useState<string[][]>([]);
  const [marked, setMarked] = useState<boolean[][]>([]);
  const [hasBingo, setHasBingo] = useState(false);

  useEffect(() => {
    if (hasBingo) {
      const audio = new Audio(winAudio);
      audio.play();
    }
  }, [hasBingo]);

  useEffect(() => {
    const { board, marked } = generateBoard(phrases);
    setBoard(board);
    setMarked(marked);
  }, []);


  const handleClick = (row: number, col: number) => {
    if (hasBingo || marked[row][col]) return;

    const newMarked = marked.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? true : cell))
    );
    setMarked(newMarked);
    if (checkBingo(newMarked)) setHasBingo(true);
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-2 w-full max-w-md mx-auto">
        {board.flat().map((phrase, idx) => (
          <BingoTile
            key={idx}
            phrase={phrase}
            marked={marked[Math.floor(idx / 5)][idx % 5]}
            onClick={() => handleClick(Math.floor(idx / 5), idx % 5)}
          />
        ))}
      </div>
      {hasBingo && <Confetti />}
    </div>
  );
}

export default BingoBoard;