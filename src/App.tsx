import GuessResult from "./components/GuessResult/GuessResult";
import { useState } from "react";
import City, { CityProps } from "./components/City/City";
import WordLetter, {
  WordLetterProps,
} from "./components/WordLetter/WordLetter";
import cityList from "./config/cityList";
import Letter, { LetterProps } from "./components/Letter/Letter";
import letterList from "./config/letterList";
import "./App.css";

let word = "i love you";
const generateWord = (): WordLetterProps[] => {
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
  const [cities, setCities] = useState<CityProps[]>(cityList);
  const [wordLetter, setWordLetter] =
    useState<WordLetterProps[]>(generateWord());
  const [letters, setLetters] = useState<LetterProps[]>(letterList);
  const [cityTracker, setCityTracker] = useState<number>(0);

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
        onClick={() => handleOnClick(letterObj)}
      ></Letter>
    );
  });
  const handleOnClick = (letterObj: LetterProps): void => {
    const letter: string = letterObj.letter;
    let containsLetter: boolean = false;
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
    }
    if (!containsLetter) {
      setCities((prevCities: CityProps[]): CityProps[] => {
        prevCities[cityTracker].isRemoved = true;
        return prevCities;
      });
      setCityTracker((prevValue: number) => prevValue + 1);
      if (cityTracker === cityList.length - 1) {
        setLetters((prevLetters: LetterProps[]): LetterProps[] => {
          return prevLetters.map((prevLetter) => ({
            ...prevLetter,
            status:
              prevLetter.status === "default" ? "game-over" : prevLetter.status,
          }));
        });
      }
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
        <GuessResult></GuessResult>
      </section>
      <section className="cities-container">{citiesItems}</section>
      <section className="correct-letters-container">{wordLetterItems}</section>
      <section className="letters-container">{letterItems}</section>
    </div>
  );
}

export default App;
