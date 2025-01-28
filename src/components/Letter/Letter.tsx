import "./Letter.css";

type LetterProps = {
  letter: string;
  status: "default" | "success" | "failure" | "game-over";
};
type onClickProps = {
  onClick: (letter: string) => void;
};
type guessStatusProps = {
  guessStatus: string;
};
const Letter: React.FC<LetterProps & onClickProps & guessStatusProps> = ({
  letter,
  status,
  onClick,
  guessStatus,
}) => {
  return (
    <button
      key={letter}
      className={`letter-box ${status}`}
      onClick={
        guessStatus !== "gameWon" && guessStatus !== "gameLost"
          ? () => onClick(letter)
          : undefined
      }
    >
      {letter}
    </button>
  );
};

export default Letter;
export type { LetterProps };
