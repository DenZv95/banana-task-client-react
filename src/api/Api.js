import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 500,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const $api = async ({ url, type = 'GET', auth = true, body }) => {
  if (auth) {
    const token = localStorage.getItem('token');
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  let data;

  try {
    switch (type) {
      case 'GET':
      default:
        data = await instance.get(url);
        break;
      case 'POST':
        data = await instance.post(url, body);
        break;
      case 'PUT':
        data = await instance.put(url, body);
        break;
      case 'DELETE':
        data = await instance.delete(url, { data: body });
        break;
    }

    return data.data;
  } catch (error) {
    if (error.response) {
      // Запрос был сделан, и сервер ответил кодом состояния, который
      // выходит за пределы 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен
      // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
      // http.ClientRequest в node.js
      console.log(error.request);
    } else {
      // Произошло что-то при настройке запроса, вызвавшее ошибку
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};
