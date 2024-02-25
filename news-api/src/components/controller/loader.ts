import { Callback, HttpStatus, Endpoint } from '../../types/index';

if (!process.env.API_URL || !process.env.API_KEY) {
  const errorMessage = document.createElement('div');
  const main = document.querySelector('main') as HTMLElement;
  errorMessage.classList.add('error-message');
  errorMessage.textContent = 'Required variable(s) is(are) missing. Please set API_URL and(or) API_KEY.';
  main.append(errorMessage);
}

class Loader {
  private options: Record<string, string> = {
    apiKey: process.env.API_KEY || '',
  };

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === HttpStatus.UNAUTHORIZED || res.status === HttpStatus.NOT_FOUND)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: Record<string, string>, endpoint: Endpoint): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${process.env.API_URL}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load<T>(method: string, endpoint: Endpoint, callback: Callback<T>, options: Record<string, string> = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
