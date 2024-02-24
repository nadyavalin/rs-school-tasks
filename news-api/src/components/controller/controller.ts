import Loader from './loader';
import { Callback, DataSources, DataNews, Endpoint } from '../../types/index';

class AppController extends Loader {
  getSources(callback: Callback<DataSources>) {
    super.load('GET', Endpoint.Sources, callback);
  }

  getArticles(e: Event, callback: Callback<DataNews>) {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (sourceId) {
          if (newsContainer.getAttribute('data-source') !== sourceId) {
            newsContainer.setAttribute('data-source', sourceId);
            super.load('GET', Endpoint.Everything, callback, {
              sources: sourceId,
            });
          }
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
