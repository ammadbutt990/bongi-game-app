import React from 'react';

function BingoTile({ phrase, marked, onClick }: {
  phrase: string;
  marked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 h-40 text-sm bg-white border-2 rounded-xl shadow transition duration-200 ease-in-out ${marked ? 'bg-green-300 border-green-500' : 'hover:bg-yellow-200'
        }`}
    >
      <span className="break-words leading-tight px-1">{phrase}</span>
    </button>
  );
}

export default BingoTile;