import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  view: AppView;
  controller: AppController;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    const sourceItems = document.querySelector('.sources');
    if (sourceItems) {
      sourceItems.addEventListener('click', (e) => this.controller.getArticles(e, (data) => this.view.drawNews(data)));
    }
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}
export default App;
