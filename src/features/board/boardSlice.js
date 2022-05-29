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
      playing: true,
      width: 50,
      height: 60,
      mines: 350,
      boardArray: newBoard(50, 60, 350),
    },
  },
  reducers: {
    generate: (state, action) => {
      state.value = {
        playing: true,
        width: action.payload.width,
        height: action.payload.height,
        mines: action.payload.mines,
        boardArray: newBoard(
          action.payload.width,
          action.payload.height,
          action.payload.mines
        ),
      };
    },
    reveal: (state, action) => {
      if (state.value.playing === false) {
        return;
      }
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
      if (state.value.boardArray[action.payload].value === -9) {
        state.value.playing = false;
        state.value.boardArray.forEach((square) => {
          if (square.value === -9) {
            square.revealed = true;
          }
        });
      }
    },
    toggleFlagged: (state, action) => {
      if (state.value.playing === false) {
        return;
      }
      state.value.boardArray[action.payload].flagged =
        !state.value.boardArray[action.payload].flagged;
    },
  },
});

export const { generate, reveal, toggleFlagged } = boardSlice.actions;

export default boardSlice.reducer;
