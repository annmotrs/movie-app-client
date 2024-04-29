import axios from 'axios';

class MovieService {
  #url = 'https://kinopoiskapiunofficial.tech/api/';
  #headers = {
    'X-API-KEY': import.meta.env.VITE_API_KEY,
    'Content-Type': 'application/json',
  };

  async getAll(page = 1, genre = null, keyword = '') {
    return axios.get(
      `${this.#url}v2.2/films?${
        genre ? 'genres=' + genre + '&' : ''
      }order=NUM_VOTE&type=FILM${
        keyword.length > 0 ? '&keyword=' + keyword : ''
      }&page=${page}`,
      {
        headers: this.#headers,
      }
    );
  }

  async getFilters() {
    return axios.get(`${this.#url}v2.2/films/filters`, {
      headers: this.#headers,
    });
  }

  async getById(id) {
    return axios.get(`${this.#url}v2.2/films/${id}`, {
      headers: this.#headers,
    });
  }

  async getStaffOfMovie(id) {
    return axios.get(`${this.#url}v1/staff?filmId=${id}`, {
      headers: this.#headers,
    });
  }

  async getFirstMovie() {
    const { data } = await this.getAll();
    return await axios.get(
      `${this.#url}v2.2/films/${data.items[0].kinopoiskId}`,
      {
        headers: this.#headers,
      }
    );
  }
}

export default new MovieService();
