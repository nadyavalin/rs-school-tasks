import './articles.css';
import { DataArticle } from '../../../types/index';
import { BaseView } from '../baseView';

class Article extends BaseView<DataArticle[]> {
  draw(data: DataArticle[] = []) {
    const articles = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const articleTemp = document.querySelector('#articleTemp') as HTMLTemplateElement;

    articles.forEach((item, idx) => {
      const articleClone = articleTemp.content.cloneNode(true) as HTMLElement;

      if (idx % 2) (articleClone.querySelector('.article') as HTMLElement).classList.add('alt');

      (articleClone.querySelector('.article__meta-photo') as HTMLElement).style.backgroundImage = `url(${
        item.urlToImage || 'img/article_placeholder.jpg'
      })`;
      (articleClone.querySelector('.article__meta-author') as HTMLElement).textContent =
        item.author || item.source.name;
      (articleClone.querySelector('.article__meta-date') as HTMLElement).textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      (articleClone.querySelector('.article__description-title') as HTMLElement).textContent = item.title;
      (articleClone.querySelector('.article__description-source') as HTMLElement).textContent = item.source.name;
      (articleClone.querySelector('.article__description-content') as HTMLElement).textContent = item.description;
      (articleClone.querySelector('.article__read-more a') as HTMLAnchorElement).setAttribute('href', item.url);

      fragment.append(articleClone);
    });

    const articleDiv = document.querySelector('.articles') as HTMLDivElement;
    if (articleDiv) {
      articleDiv.innerHTML = '';
      articleDiv.appendChild(fragment);
    }
  }
}

export default Article;
