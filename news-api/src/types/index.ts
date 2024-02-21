export interface NestedItems {
  id: string;
  name: string;
}

export interface NewsItem {
  source: NestedItems;
  title: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  description: string;
  url: string;
}

export interface NewsItemSources {
  id: string;
  name: string;
}
