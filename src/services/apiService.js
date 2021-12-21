const API_KEY = '24009911-9ac198a76ee72dc693090197c';
const BASE_URL = `https://pixabay.com/api/`;

function fetchImage(searchQuery, page) {
  const params = `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const URL = BASE_URL + params;

  return fetch(URL).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Нема картинок із значенням ${searchQuery}`),
    );
  });
}
const API = { fetchImage };

export default API;
