const { Worker } = require("worker_threads");
const express = require("express");
const { performance } = require("perf_hooks");
const os = require("os");
const app = express();
app.use(express.json());

const remainding = [];
const workerPool = [];

app.post("/solve-sudoku", async (req, res) => {
  // const data = JSON.parse(req.body.sudoku);
  let sudoku = new Uint8Array(req.body.sudoku);

  for (let i = 1; i <= os.cpus().length - 1; i++) {
    workerPool.push(new Worker("./workers-sudoku/worker.js"));
    console.log(`Thread ID = ${workerPool[workerPool.length - 1].threadId}`);
  }
  const t0 = performance.now();
  if (workerPool.length > 0) {
    console.log(`iniciando thread... com ${workerPool.length} threads`);
    sendToSolver(res, sudoku, workerPool.shift());
  } else {
    remainding.push((worker) => sendToSolver(res, sudoku, worker));
  }
  const t1 = performance.now();
  console.log(`Call to solve sudoku took ${t1 - t0} milliseconds. with ${workerPool.length} threads`);
});

app.post("/solve-sudoku-normal", async (req, res) => {
  let sudoku = new Uint8Array(req.body.sudoku);
  const oneWorker = [new Worker("./workers-sudoku/worker.js")];
  const t0 = performance.now();
  console.log(`Thread ID = ${oneWorker[oneWorker.length - 1].threadId}`);
  if (oneWorker.length > 0) {
    console.log(`iniciando local... com ${oneWorker.length} threads`);
    sendToSolver(res, sudoku, oneWorker.shift());
  } else {
    remainding.push((worker) => sendToSolver(res, sudoku, worker));
  }
  const t1 = performance.now();
  console.log(`Call to solve sudoku took ${t1 - t0} milliseconds. with ${oneWorker.length} thread`);
});

const sendToSolver = (res, sudokuData, worker) => {
  worker.postMessage(sudokuData);
  worker.once("message", (solutionData) => {
    try {
      res.status(200).send(JSON.stringify([...solutionData]));
      if (remainding.length > 0) {
        remainding.shift()(worker);
      } else {
        workerPool.push(worker);
      }
    } catch (err) {
      res.status(400).send("Sudoku sem solução");
    }
  });
};

app.listen(5000);
