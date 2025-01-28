import GuessResult, { statusProps } from "./components/GuessResult/GuessResult";
import { useState, useEffect } from "react";
import City, { CityProps } from "./components/City/City";
import WordLetter, {
  WordLetterProps,
} from "./components/WordLetter/WordLetter";
import cityList from "./config/cityList";
import Letter, { LetterProps } from "./components/Letter/Letter";
import letterList from "./config/letterList";
import SubmitWord from "./components/SubmitWord/SubmitWord";
import "./App.css";

// let word = "i love you";
const generateWord = (word: string): WordLetterProps[] => {
  const arr: WordLetterProps[] = [];
  const letterArray = word.toUpperCase().split("");
  letterArray.forEach((letter, index) => {
    arr.push({
      id: index,
      letter: letter,
      isHidden: true,
    });
  });
  return arr;
};

function App() {
  const [word, setWord] = useState<string>("");
  const [cities, setCities] = useState<CityProps[]>(cityList);
  const [wordLetter, setWordLetter] = useState<WordLetterProps[]>(
    generateWord(word),
  );
  const [letters, setLetters] = useState<LetterProps[]>(letterList);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [guessStatus, setGuessStatus] = useState<statusProps>("noFailures");
  const citiesItems: JSX.Element[] = cities.map((city) => {
    return <City key={city.name} {...city}></City>;
  });
  const wordLetterItems: JSX.Element[] = wordLetter.map((letter) => {
    return <WordLetter key={letter.id} {...letter}></WordLetter>;
  });
  const letterItems: JSX.Element[] = letters.map((letterObj) => {
    return (
      <Letter
        key={letterObj.letter}
        {...letterObj}
        guessStatus={guessStatus}
        onClick={() => handleOnClick(letterObj)}
      ></Letter>
    );
  });
  console.log(guessedLetters);
  const incorrectGuesses: string[] = guessedLetters.filter(
    (letter) => !word.toUpperCase().includes(letter),
  );
  const handleWordEmit = (newWord: string) => {
    setWord(newWord.toUpperCase());
    setGuessedLetters([]);
    setLetters(letterList.map((letter) => ({ ...letter, status: "default" })));
    setGuessStatus("noFailures");
    setWordLetter(generateWord(newWord.toUpperCase()));
    setCities(cities.map((city) => ({ ...city, isRemoved: false })));
  };
  useEffect(() => {
    const gameWon: boolean = wordLetter
      .filter((obj) => obj.letter !== " ")
      .every((obj) => !obj.isHidden);
    const gameLost: boolean = incorrectGuesses.length === cities.length;
    console.log(guessStatus);
    if (
      guessStatus === "noFailures" &&
      guessedLetters.length > 0 &&
      !word.includes(guessedLetters[guessedLetters.length - 1])
    ) {
      setGuessStatus("inProgress");
    }
    if (guessedLetters.length > 0 && gameWon) {
      setGuessStatus("gameWon");
    }
    if (gameLost) {
      setGuessStatus("gameLost");
    }
  }, [guessedLetters, guessStatus, word]);
  const handleOnClick = (letterObj: LetterProps): void => {
    const letter: string = letterObj.letter;
    let containsLetter: boolean | null = null;
    setGuessedLetters((prevGuessedLetters) => [...prevGuessedLetters, letter]);
    if (word.toUpperCase().includes(letter)) {
      containsLetter = true;
      setWordLetter((prevWordLetter: WordLetterProps[]): WordLetterProps[] => {
        const foundLetters: number[] = prevWordLetter
          .filter((obj: WordLetterProps) => obj.letter === letter)
          .map((letterObj: WordLetterProps) => letterObj.id);
        return prevWordLetter.map((letter: WordLetterProps) => ({
          ...letter,
          isHidden: foundLetters.includes(letter.id) ? false : letter.isHidden,
        }));
      });
    } else {
      containsLetter = false;
      setCities((prevCities: CityProps[]): CityProps[] => {
        prevCities[incorrectGuesses.length].isRemoved = true;
        return prevCities;
      });
    }
    setLetters((prevLetter: LetterProps[]): LetterProps[] => {
      return prevLetter.map((obj: LetterProps) => ({
        ...obj,
        status:
          obj.letter === letter && containsLetter
            ? "success"
            : obj.letter === letter
              ? "failure"
              : obj.status,
      }));
    });
  };
  return (
    <div className="content">
      <section className="instructions">
        <header>
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word in under 9 attempts to keep the travel plan safe from
            Alabama!
          </p>
        </header>
        <GuessResult
          city={
            incorrectGuesses.length > 0
              ? cities[incorrectGuesses.length - 1].name
              : undefined
          }
          guessStatus={guessStatus}
        ></GuessResult>
      </section>
      <section className="cities-container">{citiesItems}</section>
      <section className="correct-letters-container">{wordLetterItems}</section>
      <SubmitWord emitWord={handleWordEmit}></SubmitWord>

      <section
        className={`letters-container ${guessStatus === "gameWon" || guessStatus === "gameLost" ? "game-over" : ""}`}
      >
        {letterItems}
      </section>
    </div>
  );
}

export default App;
