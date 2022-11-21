import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '31476587-aa286699ef3c7562eebb09d32';
const limit = 40;

class FetchImages {
  #query;

  constructor() {
    this.page = 1;
  }
  set query(newQuery) {
    this.page = 1;
    this.#query = newQuery;
  }

  async fetch() {
    const response = await axios.get(`/?key=${API_KEY}`, {
      params: {
        q: this.#query,
        page: this.page,
        per_page: limit,
        image_type: 'foto',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    if (this.page > response.data.totalHits / limit) {
      response.data.isEnd = true;
    }
    this.page += 1;
    return response.data;
  }
}

export default FetchImages;
