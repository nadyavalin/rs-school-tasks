export interface NewsItemsSources {
  id: string;
  name: string;
}

export interface NewsItems {
  source: NewsItemsSources;
  title: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  description: string;
  url: string;
  content: string;
}

export interface AddNews {
  articles: NewsItems[];
  sources: NewsItemsSources[];
}

export interface ErrorText {
  status: number;
  statusText: string;
  ok: boolean;
  json(): Promise<AddNews>;
}

export type CallbackText<T> = (data: T) => void;
