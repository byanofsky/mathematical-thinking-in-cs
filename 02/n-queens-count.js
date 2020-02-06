/**
 * Returns the count of possible N Queens solutions given a board size `n`.
 * @param {Number} n the board size (`nxn`)
 * @returns {Number} the count of possible solutions
 * TODO: Duplicate code with n-queens. Extract.
 */
const nQueensCount = n => {
  const getCount = (board = []) => {
    if (isComplete(board)) {
      return 1;
    }

    let count = 0;
    for (let row = 0; row < n; row++) {
      if (isValidPlacement(board, row)) {
        board.push(row);
        const result = getCount(board);
        count += result;
        board.pop();
      }
    }
    return count;
  };

  /**
   * Returns true if the next placement is valid.
   * Assumes the next placement will be pushed on to the board array.
   * A valid placement is one where no other column has a placement on the same row,
   * and no 2 placements are diagonal.
   */
  const isValidPlacement = (board, nextRow) => {
    const nextCol = board.length;
    return board.every(
      (row, col) => nextCol - col !== Math.abs(nextRow - row) && nextRow !== row
    );
  };

  /**
   * Returns true if the board is complete. Specifically, the board length equals the expected size `n`.
   */
  const isComplete = board => board.length === n;

  return getCount();
};

console.log('3 queens:', nQueensCount(3));
console.log('4 queens:', nQueensCount(4));
console.log('5 queens:', nQueensCount(5));
console.log('8 queens:', nQueensCount(8));
