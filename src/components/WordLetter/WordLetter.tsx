import "./WordLetter.css";
type WordLetterProps = {
  id: number;
  letter: string;
  isHidden: boolean;
};
const WordLetter: React.FC<WordLetterProps> = ({
  letter,
  isHidden,
}: {
  letter: string;
  isHidden: boolean;
}) => {
  return (
    <div
      className={`letter-min-width 
      ${letter === " " ? "" : "correct-letter-border correct-letters"}`}
    >
      <span className={`${isHidden ? "hidden" : "visible"}`}>{letter}</span>
    </div>
  );
};

export default WordLetter;
export type { WordLetterProps };
