import { useState } from "react";
import "./SubmitWord.css";
type SubmitWordProps = {
  emitWord: (word: string) => void;
};
const SubmitWord: React.FC<SubmitWordProps> = ({ emitWord }): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = event.target.value.replace(/[0-9]/g, "");
    setInputValue(filteredValue);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.length > 0) {
      emitWord(inputValue);
      setInputValue("");
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          onChange={handleChange}
          id="wordInput"
          name="word"
          value={inputValue}
          placeholder="Enter a word"
        ></input>
        <button type="submit">Update Word</button>
      </form>
      <small className="caption">Cannot enter numbers</small>
    </div>
  );
};
export default SubmitWord;
