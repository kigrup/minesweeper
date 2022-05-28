import { createSlice } from "@reduxjs/toolkit";

const neighboursLocation = (w) => {
  return [
    {
      offset: -w - 1,
      rowDifference: -1,
    },
    {
      offset: -w,
      rowDifference: -1,
    },
    {
      offset: -w + 1,
      rowDifference: -1,
    },
    {
      offset: -1,
      rowDifference: 0,
    },
    {
      offset: 1,
      rowDifference: 0,
    },
    {
      offset: +w - 1,
      rowDifference: 1,
    },
    {
      offset: +w,
      rowDifference: 1,
    },
    {
      offset: +w + 1,
      rowDifference: 1,
    },
  ];
};

const newBoard = (w, h, n) => {
  n = Math.min(w * h, n);
  let neighbours = neighboursLocation(w);
  let board = Array(w * h);
  for (let p = 0; p < w * h; p++) {
    board[p] = {
      id: p,
      value: 0,
      revealed: false,
      flagged: false,
    };
  }
  for (let i = 0; i < n; i++) {
    let r = Math.floor(Math.random() * w * h);
    if (board[r].value === -9) {
      i--;
    } else {
      board[r].value = -9;
      neighbours.forEach((neighbour) => {
        let pos = r + neighbour.offset;
        if (0 <= pos && pos < w * h && board[pos].value !== -9) {
          if (
            neighbour.rowDifference ===
            Math.floor(pos / w) - Math.floor(r / w)
          ) {
            board[pos].value++;
          }
        }
      });
    }
  }
  return board;
};

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    value: {
      width: 30,
      height: 60,
      mines: 250,
      boardArray: newBoard(30, 60, 250),
    },
  },
  reducers: {
    generate: (state, width, height, mines) => {
      state.value = {
        width: width,
        height: height,
        mines: mines,
        boardArray: newBoard(width, height, mines),
      };
    },
    reveal: (state, action) => {
      let w = state.value.width;
      let h = state.value.height;
      let neighbours = neighboursLocation(w);

      const recursiveReveal = (square) => {
        state.value.boardArray[square].revealed = true;
        if (state.value.boardArray[square].value === 0) {
          for (let n = 0; n < neighbours.length; n++) {
            let neighbour = neighbours[n];
            let pos = square + neighbour.offset;
            if (
              0 <= pos &&
              pos < w * h &&
              neighbour.rowDifference ===
                Math.floor(pos / w) - Math.floor(square / w) &&
              state.value.boardArray[pos].revealed === false
            ) {
              if (state.value.boardArray[pos].value === 0) {
                recursiveReveal(pos);
              } else {
                state.value.boardArray[pos].revealed = true;
              }
            }
          }
        }
      };

      recursiveReveal(action.payload);
    },
    toggleFlagged: (state, action) => {
      state.value.boardArray[action.payload].flagged =
        !state.value.boardArray[action.payload].flagged;
    },
  },
});

export const { generate, reveal, toggleFlagged } = boardSlice.actions;

export default boardSlice.reducer;
