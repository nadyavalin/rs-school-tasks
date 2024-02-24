import { DataNews, DataSources } from '../../types/index';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  articles: News;
  sources: Sources;

  constructor() {
    this.articles = new News();
    this.sources = new Sources();
  }

  drawNews(data: DataNews) {
    const values = data?.articles ? data?.articles : [];
    this.articles.draw(values);
  }

  drawSources(data: DataSources) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
