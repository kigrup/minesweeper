import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generate, reveal, setFlagged } from './boardSlice';

export function Board() {
  const board = useSelector((state) => state.board.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div className='grid'></div>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
