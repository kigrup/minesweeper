import Field from "./Field";
import { RunSolver, StopSolver } from "./solver";

const Game = () => {
  RunSolver();

  return (
    <div className="p-6 text-center select-none">
      <div className="mb-5 text-5xl">Minesweeper</div>
      <Field />
    </div>
  );
};

export default Game;
