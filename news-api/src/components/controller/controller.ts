import Loader from './loader';
import { Callback, DataSources, DataArticles, Endpoint } from '../../types/index';

class AppController extends Loader {
  getSources(callback: Callback<DataSources>) {
    super.load('GET', Endpoint.Sources, callback);
  }

  getArticles(e: Event, callback: Callback<DataArticles>) {
    let target = e.target as HTMLElement;
    const articlesContainer = e.currentTarget as HTMLElement;

    while (target !== articlesContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (sourceId) {
          if (articlesContainer.getAttribute('data-source') !== sourceId) {
            articlesContainer.setAttribute('data-source', sourceId);
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
