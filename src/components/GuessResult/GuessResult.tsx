import "./GuessResult.css";
type GuessResultProps = {
  city: string | undefined;
  guessStatus: statusProps;
};
type statusProps = "noFailures" | "inProgress" | "gameWon" | "gameLost";

const GuessResult: React.FC<GuessResultProps> = ({ city, guessStatus }) => {
  return (
    <section>
      {guessStatus === "noFailures" && <div className="empty-div"></div>}
      {guessStatus === "gameWon" && (
        <div className="guess-result success">
          <div className="result-header">You win!</div>
          <div>Well done! 🎉</div>
        </div>
      )}
      {guessStatus === "gameLost" && (
        <div className="guess-result failure">
          <div className="result-header">Game over!</div>
          <div>Better start packing for Alabama! 😭</div>
        </div>
      )}
      {guessStatus === "inProgress" && (
        <div className="guess-result italic">“Farewell {city}” 🫡</div>
      )}
    </section>
  );
};

export default GuessResult;
export type { statusProps };
