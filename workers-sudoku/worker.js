const { parentPort } = require("worker_threads");
const { solveSudoku } = require("./solve-sudoku.js");

parentPort.on("message", (sudokuData) => {
  const solution = solveSudoku(sudokuData);
  parentPort.postMessage(solution);
});
