import GuessResult from "./components/GuessResult/GuessResult"
import { v4 as uuidv4 } from 'uuid';

import './App.css'

type CityProps = {
  id: string;
  name: string;
  isRemoved: boolean;
  textColor: string;
  background: string;
}
type CorrectLetter = {
  id: string;
  letter: string;
  isHidden: boolean;
}
type Letter = {
  id: string;
  letter: string;

}
function generateId(): string {
  return uuidv4();
}

const City: React.FC<CityProps> = ({ name, isRemoved, textColor, background }: { name: string; isRemoved: boolean; textColor: string; background: string }) => {
  return (
    <div className={`city ${isRemoved ? "removed" : "active"} ${textColor}`} style={{ backgroundColor: background }} >
      {name}
    </div>
  )
}

const CorrectLetter: React.FC<CorrectLetter> = ({ letter, isHidden }: { letter: string; isHidden: boolean }) => {
  return (
    <div className={` letter-min-width ${isHidden ? 'hidden' : 'visible'} ${letter === " " ? "" : "correct-letter-border correct-letters "}`}>{letter}</div>
  )
}

// const Letter: React.FC<>
function App() {
  let word = "i love you";
  const cities: CityProps[] = [
    { id: generateId(), name: "Budapest", isRemoved: false, textColor: "white", background: "#E2680F" },
    { id: generateId(), name: "Berlin", isRemoved: false, textColor: "white", background: "#328AF1" },
    { id: generateId(), name: "Lauterbrunnen", isRemoved: false, textColor: "black", background: "#F4EB13" },
    { id: generateId(), name: "Paris", isRemoved: false, textColor: "black", background: "#2ED3E9" },
    { id: generateId(), name: "London", isRemoved: false, textColor: "white", background: "#298EC6" },
    { id: generateId(), name: "Sahara Desert", isRemoved: false, textColor: "black", background: "#FFD742" },
    { id: generateId(), name: "1966 China", isRemoved: false, textColor: "white", background: "#599137" },
    { id: generateId(), name: "North Korea", isRemoved: false, textColor: "white", background: "#D02B2B" },
    { id: generateId(), name: "Alabama", isRemoved: false, textColor: "white", background: "#2D519F" },
  ];
  const generateWord = (): CorrectLetter[] => {
    const arr: CorrectLetter[] = [];
    const letterArray = word.toUpperCase().split("");
    letterArray.forEach(letter => {
      arr.push({
        id: generateId(),
        letter: letter,
        isHidden: false,
      });
    });
    return arr;
  };
  const citiesItems: JSX.Element[] = cities.map(city => {
    return <City key={city.id} {...city}></City>
  });
  console.log(generateWord());
  const correctLetterItems: JSX.Element[] = generateWord()
    .map(letter => {
      return <CorrectLetter key={letter.id} {...letter}></CorrectLetter>
    });
  return (
    <div className="content">
      <section className="instructions">
        <header>
          <h1>Assembly: Endgame</h1>
          <p>Guess the word in under 9 attempts to keep the travel plan safe from Alabama!</p>
        </header>
        <GuessResult></GuessResult>
      </section>
      <section className="cities-container">
        {citiesItems}
      </section>
      <section className="correct-letters-container">
        {correctLetterItems}
      </section>
    </div>
  )
}

export default App
