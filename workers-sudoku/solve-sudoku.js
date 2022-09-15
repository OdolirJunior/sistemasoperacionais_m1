const solveSudoku = (sudoku) => {
  const acceptIndex = sudoku.indexOf(0);
  if (acceptIndex === -1) {
    return sudoku;
  }
  const [x, y] = indexToXY(acceptIndex);
  const forbiddenValues = new Uint8Array(10);
  rowsForbidden(sudoku, x, forbiddenValues);
  columnForbidden(sudoku, y, forbiddenValues);
  gridForbidden(sudoku, x, y, forbiddenValues);

  for (let val = 1; val <= 9; val++) {
    if (forbiddenValues[val]) {
      continue;
    }
    sudoku[acceptIndex] = val;
    if (solveSudoku(sudoku)) return sudoku;
  }
  sudoku[acceptIndex] = 0;
  return null;
};

const rowsForbidden = (sudoku, x, forbiddenValues) => {
  for (let y = 0; y < 9; y++) {
    forbiddenValues[sudoku[xyToIndex(x, y)]] = 1;
  }
};

const columnForbidden = (sudoku, y, forbiddenValues) => {
  for (let x = 0; x < 9; x++) {
    forbiddenValues[sudoku[xyToIndex(x, y)]] = 1;
  }
};

const gridForbidden = (sudoku, x, y, forbiddenValues) => {
  for (let x2 = x - (x % 3); x2 < x - (x % 3) + 3; x2++) {
    for (let y2 = y - (y % 3); y2 < y - (y % 3) + 3; y2++) {
      forbiddenValues[sudoku[xyToIndex(x2, y2)]] = 1;
    }
  }
};
const indexToXY = (index) => {
  const x = index % 9;
  const y = (index - x) / 9;
  return [x, y];
};

const xyToIndex = (x, y) => {
  return x + y * 9;
};

exports.solveSudoku = solveSudoku;
