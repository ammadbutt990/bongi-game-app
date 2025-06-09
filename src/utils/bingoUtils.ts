export function generateBoard(phrases: string[]) {
  const shuffled = [...phrases].sort(() => Math.random() - 0.5).slice(0, 24);
  const board = [];
  const marked = [];
  let idx = 0;

  for (let i = 0; i < 5; i++) {
    const row = [];
    const rowMark = [];
    for (let j = 0; j < 5; j++) {
      if (i === 2 && j === 2) {
        row.push("FREE SPACE");
        rowMark.push(true);
      } else {
        row.push(shuffled[idx++]);
        rowMark.push(false);
      }
    }
    board.push(row);
    marked.push(rowMark);
  }

  return { board, marked };
}

export function checkBingo(marked: boolean[][]): boolean {
  for (let i = 0; i < 5; i++) {
    if (marked[i].every(Boolean)) return true; // row
    if (marked.every(row => row[i])) return true; // col
  }
  if (marked.every((row, i) => row[i])) return true; // main diag
  if (marked.every((row, i) => row[4 - i])) return true; // anti diag
  return false;
}