import React from 'react';

function BingoTile({ tileNumber, phrase, marked, onClick, disabled, highlight }: {
  tileNumber: number;
  phrase: string;
  marked: boolean;
  onClick: () => void;
  disabled: boolean;
  highlight:boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col justify-center items-center text-center 
        p-2 h-28 w-full text-sm sm:text-base 
        bg-white border-2 rounded-xl shadow 
        transition duration-200 ease-in-out
        ${marked ? 'bg-green-300 border-green-500' : ''}
        ${disabled && !marked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-200'}
        ${highlight ? 'animate-pulse border-blue-500 ring-2 ring-blue-300' : ''}
      `}
    >
      <span className="text-xs font-bold mb-1">{tileNumber}</span>
      <span className="break-words text-sm leading-tight">{phrase}</span>
    </button>
  );
}

export default BingoTile;