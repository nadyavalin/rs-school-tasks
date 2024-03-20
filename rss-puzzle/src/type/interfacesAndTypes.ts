export interface Round {
  roundData: RoundData;
  words: Words[];
}

export interface RoundData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface Words {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

export interface GameData {
  length: number;
  rounds: Round[];
  roundsCount: number;
}

export interface User {
  firstName: string;
  surname: string;
}
