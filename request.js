/**
 * Получение объекта с настройками для Fetch
 * @param  {Object} options Настройки
 * @return {Object}         Объект с настройками
 */
const getOptions = options => {
  const opts = options || {};

  if( !opts.hasOwnProperty('method') ) {
    Object.defineProperty(opts, 'method', {
      value: 'GET'
    })
  }

  if( !opts.hasOwnProperty('headers') ) {
    Object.defineProperty(opts, 'headers', {
      value: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  return opts;
}

/**
 * Middleware проверки полученного ответа от сервера
 * @param  {Response} response Ответ сервера
 * @return {Promise}          JSON объект
 */
const checkResponse = response => {
  if(response.status !== 200)
    return Promise.reject('Ошибка выполнения запроса!');

  return response.json();
}

/**
 * Парсинг JSON ответа
 * @param  {Object} json Данные от сервера
 * @return {Promise}      [description]
 */
const checkJSON = (json, SUCCESS_CODE = 200, SUCCESS_STATUS = 'success') => {
  if(json.code !== SUCCESS_CODE && json.status !== SUCCESS_STATUS)
    return Promise.reject(json.error || "Получен некорректный ответ от сервер");

  return json.data;
}

const RequestBase = (link, options) => {
  if(!link) return Promise.reject('Необходимо передать ссылку для запроса');

  /** @type {Object} Параметры запроса для fetch */
  const opts = getOptions(options);

  return fetch(link, opts);
}

const Request = (link, options) => RequestBase(link, options).then(checkResponse).then(checkJSON);

export {
  Request,
  RequestBase,
  checkJSON,
  checkResponse,
  getOptions
}