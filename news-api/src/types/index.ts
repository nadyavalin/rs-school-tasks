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
}

export interface DataArticle {
  source: SourceShort;
  title: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  description: string;
  url: string;
  content: string;
}

export interface DataArticles {
  status: string;
  totalResult: number;
  articles: DataArticle[];
}

export interface DataSources {
  status: string;
  sources: Source[];
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
