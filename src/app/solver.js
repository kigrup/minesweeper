import { useSelector, useDispatch } from "react-redux";
import { reveal, toggleFlagged } from "../features/board/boardSlice";

export const RunSolver = () => {
  const board = useSelector((state) => state.board.value);
  const dispatch = useDispatch();
};

export const StopSolver = () => {};
