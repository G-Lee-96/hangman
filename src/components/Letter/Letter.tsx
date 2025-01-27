import "./Letter.css";

type LetterProps = {
  letter: string;
  status: "default" | "success" | "failure" | "game-over";
};
type onClickProps = {
  onClick: (letter: string) => void;
};
const Letter: React.FC<LetterProps & onClickProps> = ({
  letter,
  status,
  onClick,
}) => {
  return (
    <button
      key={letter}
      className={`letter-box ${status}`}
      onClick={status == "default" ? () => onClick(letter) : undefined}
    >
      {letter}
    </button>
  );
};

export default Letter;
export type { LetterProps };
