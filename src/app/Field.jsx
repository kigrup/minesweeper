import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generate, reveal, toggleFlagged } from '../features/board/boardSlice';

const Square = (props) => {
  const { squareData } = props;
  const { id, value, revealed, flagged } = squareData;
  const dispatch = useDispatch();

  return (
    <div
      className='w-6 h-6 text-center'
      onClick={() => dispatch(reveal(Number(id)))}
      onContextMenuCapture={() => {
        dispatch(toggleFlagged(Number(id)));
      }}
    >
      {revealed
        ? value === -9
          ? '💣'
          : value > 0
          ? value
          : ''
        : flagged
        ? '🚩'
        : '⬜'}
    </div>
  );
};

const Field = () => {
  const board = useSelector((state) => state.board.value);

  return (
    <div className=''>
      {[...Array(board.height)].map((element, indexi) => (
        <div key={indexi} className='flex flex-row place-content-center'>
          {[...Array(board.width)].map((element, indexj) => (
            <Square
              key={indexi * board.width + indexj}
              id={indexi * board.width + indexj}
              squareData={board.boardArray[indexi * board.width + indexj]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Field;
