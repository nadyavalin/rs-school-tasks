import './sources.css';
import { NewsItemsSources } from '../../../types/index';

class Sources {
  draw(data: NewsItemsSources[] = []) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

      const sourceItemName = sourceClone.querySelector('.source__item-name');
      if (sourceItemName) {
        sourceItemName.textContent = item.name;
      }

      const sourceItem = sourceClone.querySelector('.source__item');
      if (sourceItem) {
        sourceItem.setAttribute('data-source-id', item.id);
      }

      fragment.append(sourceClone);
    });

    const sourcesElement = document.querySelector('.sources');
    if (sourcesElement) {
      sourcesElement.append(fragment);
    }
  }
}

export default Sources;
