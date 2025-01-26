import GuessResult from "./components/GuessResult/GuessResult";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import City, { CityProps } from "./components/City/City";
import WordLetter, {
  WordLetterProps,
} from "./components/WordLetter/WordLetter";
import cityList from "./config/cityList";

import "./App.css";

type Letter = {
  id: string;
  letter: string;
};

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
  const [letter, setLetter] = useState<string | null>();

  const citiesItems: JSX.Element[] = cities.map((city) => {
    return <City key={city.name} {...city}></City>;
  });
  const wordLetterItems: JSX.Element[] = wordLetter.map((letter) => {
    return <WordLetter key={letter.id} {...letter}></WordLetter>;
  });
  // const letterItems: JSX.Element[] =

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
    </div>
  );
}

export default App;
