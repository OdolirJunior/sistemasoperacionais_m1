const sudokuLocal = new Uint8Array([
  0, 5, 1, 3, 6, 2, 7, 0, 0, 0, 4, 0, 0, 5, 8, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 2, 5, 0, 8, 0, 0, 0, 0, 9, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 5, 0,
  0, 0, 0, 8, 0, 1, 2, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 2, 8, 0, 0, 6, 0, 0, 0, 8, 5, 3, 4, 2, 9, 0,
]);

const run = () => {
  for (i = 0; i <= 4; i++) {
    console.log("executando...");
    fetch("http://localhost:5000/solve-sudoku", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sudokuLocal),
    }).then((res) => {
      console.log("Request complete! responsNe:", res);
    });
  }
};

run();
