import { DataArticles, DataSources } from '../../types/index';
import Articles from './articles/articles';
import Sources from './sources/sources';

export class AppView {
  articles: Articles;
  sources: Sources;

  constructor() {
    this.articles = new Articles();
    this.sources = new Sources();
  }

  drawArticles(data: DataArticles) {
    this.articles.draw(data?.articles);
  }

  drawSources(data: DataSources) {
    this.sources.draw(data?.sources);
  }
}

export default AppView;
