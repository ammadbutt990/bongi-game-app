export function generateBoard(phrases: string[], seedStr = new Date().toDateString()) {
  const seed = [...seedStr].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffled = [...phrases]
    .map((val, i) => ({ val, sort: seededRandom(seed + i) }))
    .sort((a, b) => a.sort - b.sort)
    .map(obj => obj.val)
    .slice(0, 24);

  const board: { number: number; phrase: string }[][] = [];
  let idx = 0;
  let tileNumber = 1;

  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      if (i === 2 && j === 2) {
        row.push({ number: 13, phrase: "FREE SPACE" }); // 13 is center tile
      } else {
        row.push({ number: tileNumber++, phrase: shuffled[idx++] });
      }
    }
    board.push(row);
  }

  return board;
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

export function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}