export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface SourceShort {
  id: string;
  name: string;
  articles: string;
  sources: SourceShort[];
}

export interface Article {
  source: SourceShort;
  title: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  description: string;
  url: string;
  content: string;
}

export interface DataNews {
  status: string;
  totalResult: number;
  articles: Article[];
}

export interface DataSources {
  status: string;
  sources: SourceShort[];
}

export type Callback<T> = (data: T) => void;

export enum HttpStatus {
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum Endpoint {
  Sources = 'sources',
  Everything = 'everything',
}
