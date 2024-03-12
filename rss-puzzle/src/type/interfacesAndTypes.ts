export interface Round {
  roundData: {
    id: string;
    name: string;
    imageSrc: string;
    cutSrc: string;
    author: string;
    year: string;
  };
  words: {
    audioExample: string;
    textExample: string;
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
  }[];
}

export interface GameData {
  length: number;
  rounds: Round[];
  roundsCount: number;
}
