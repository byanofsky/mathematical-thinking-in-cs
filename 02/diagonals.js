/**
 * Constructs an nxn matrix that represents the solution to the diagonals problem.
 * Each square contains one of the following:
 * 0 - empty
 * 1 - top-left to bottom-right diagonal
 * 2 - bottom-left to top-right diagonal
 * The following invariants must hold true:
 * 1. There must be m diagonals in the matrix
 * 2. No two diagonals can be touching
 * If such a matrix cannot be constructed, returns null.
 * @param {Number} n the nxn grid to find diagonals
 * @param {Number} m number of diagonals
 * @returns {Number[][] | null} a matrix of integers or null
 */
const getDiagonals = (n, m) => {
  const possibleEntries = [1, 2, 0];

  /**
   * Starting from the upper left corner, fills in a grid with each possible entry.
   * Note: Mutates grid
   */
  const fillGrid = grid => {
    if (isFilled(grid)) {
      if (isComplete(grid)) {
        return grid;
      }
      // Is filled but not complete, return null to backtrack
      return null;
    }
    // Attempt each possible entry
    for (const entry of possibleEntries) {
      // Only continue if it is valid
      if (isNextPlacementValid(grid, entry)) {
        grid.push(entry);
        const result = fillGrid(grid);
        if (result !== null) {
          return result;
        }
        // Revert if backtracking
        grid.pop();
      }
    }
    return null;
  };

  /**
   * Returns true if the grid is filled. Specifically, the grid length equals expected size (nxn).
   */
  const isFilled = grid => grid.length === n * n;

  /**
   * Returns true if the number of diagonals equals the expected number m.
   * Assumes the grid is filled.
   */
  const isComplete = grid => {
    const diagonals = grid.reduce(
      (prev, cur) => (cur > 0 ? prev + 1 : prev),
      0
    );
    return diagonals === m;
  };

  /**
   * Checks if adding the entry to the next position is valid.
   * The next position is the next open spot in the grid (grid[grid.length]).
   * A position is considered valid if the entry does not touch any of the surrounding boxes.
   * Assumes grid is not filled.
   */
  const isNextPlacementValid = (grid, entry) => {
    if (entry === 0) {
      return true;
    }
    const [row, col] = getNextPos(grid);
    // If attempt to get an invalid position (ie, col outside col size), value will be null.
    const left = getAt(grid, row, col - 1);
    const top = getAt(grid, row - 1, col);
    const right = getAt(grid, row, col + 1);
    const bottom = getAt(grid, row + 1, col);
    const topleft = getAt(grid, row - 1, col - 1);
    const topright = getAt(grid, row - 1, col + 1);
    const bottomleft = getAt(grid, row + 1, col - 1);
    const bottomright = getAt(grid, row + 1, col + 1);
    // TopLeft -> BottomRight
    if (
      entry === 1 &&
      (topleft === 1 ||
        bottomright === 1 ||
        left === 2 ||
        top === 2 ||
        right === 2 ||
        bottom === 2)
    ) {
      return false;
    }
    // BottomLeft -> TopRight
    if (
      entry === 2 &&
      (bottomleft === 2 ||
        topright === 2 ||
        left === 1 ||
        top === 1 ||
        right === 1 ||
        bottom === 1)
    ) {
      return false;
    }
    return true;
  };

  /**
   * Given a grid, row, and column, returns the entry at that position.
   * If is not a valid position, will return null.
   */
  const getAt = (grid, row, col) => {
    if (row < 0 || row >= n || col < 0 || col >= n) {
      return null;
    }
    return grid[row * n + col];
  };

  /**
   * Returns the next position (row and column) of a grid.
   */
  const getNextPos = grid => {
    const nextPos = grid.length;
    const row = Math.floor(nextPos / n);
    const col = nextPos % n;
    return [row, col];
  };

  return fillGrid([]);
};

/**
 * Pretty print a grid as an nxn matrix.
 */
const printGrid = (grid, n) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(grid[i * n + j]);
    }
    result.push(row);
  }
  return result;
};

/**
 * Test cases
 */
console.log(printGrid(getDiagonals(3, 6), 3));
console.log(printGrid(getDiagonals(4, 10), 4));
console.log(printGrid(getDiagonals(5, 16), 5));
