/**
 * Solves the N Queens problem.
 * Given a number `n` to represent an `nxn` chessboard, returns a placement of queens
 * on that board in such a way that none can take another.
 * @param {Number} n the size of the board (nxn)
 * @returns {Number[]} an array where the index represents a row and the value is the row where the queen is placed
 */
const nQueens = n => {
  /**
   * Finds the next valid placement of a queen.
   * If a valid placement is found, returns the array representing the board.
   * If no valid placement can be found, returns null.
   * Note: mutates the board array
   */
  const fillBoard = (board = []) => {
    if (isComplete(board)) {
      return board;
    }
    // Iterate through each possible placement
    for (let row = 0; row < n; row++) {
      if (isValidPlacement(board, row)) {
        board.push(row);
        const result = fillBoard(board);
        // If a result is found, immediately return
        if (result !== null) {
          return result;
        }
        // Otherwise, backtrack
        board.pop();
      }
    }
    return null;
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

  return fillBoard();
};

console.log('Expect null:', nQueens(3));
console.log('Expect [ 1, 3, 0, 2 ]:', nQueens(4));
console.log('Expect [ 0, 2, 4, 1, 3 ]:', nQueens(5));
