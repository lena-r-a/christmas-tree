import { IresponseData } from '../../interfaces/interfaces';

export default class Loader {
  link: string;

  constructor(link: string) {
    this.link = link;
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  load(method: string, callback: (data: IresponseData[]) => void): void {
    fetch(this.link, { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err: string) => console.error(err));
  }
}
