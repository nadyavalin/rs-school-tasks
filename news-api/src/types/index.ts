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
}

export interface AddSources {
  sources: NewsItemsSources[];
}