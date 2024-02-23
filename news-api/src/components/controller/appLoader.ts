import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super(String(process.env.API_URL), {
      apiKey: String(process.env.API_KEY),
    });
  }
}

export default AppLoader;
