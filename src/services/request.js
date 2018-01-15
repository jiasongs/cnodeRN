
const DOMAIN = 'https://cnodejs.org'
const APIPATH = '/api/v1'
const urlPrefix = DOMAIN + APIPATH

export const get = (url, params) => {
  if (url.indexOf('http') != -1) {
    url = url + '?'
  } else {
    url = urlPrefix + url + '?'
  }
  var query = ''
  console.log('params:' + params)
  if (params) {
    let index = 0
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        var m = (index == 0) ? '' : '&';
        var value = params[key];
        query = query + m + key + '=' + value;
      }
      index++;
    }
    url = url + query
  }
  // console.log('url:' + url)
  return fetch(url)
    .then((response) => response.json())
    .then((responseJSON) => { return responseJSON })
    .catch((error) => { return error });
}

export const post = (url, body) => {
  url = urlPrefix + url
  // console.log('POST: ', url)
  // console.log('Body: ', body)
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((responseJSON) => { return responseJSON })
    .catch((error) => { return error })
}

export const getHTML = (url, params) => {
  if (url.indexOf('http') != -1) {
    url = url + '?'
  } else {
    url = urlPrefix + url + '?'
  }
  var query = ''
  console.log('params:' + params)
  if (params) {
    let index = 0
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        var m = (index == 0) ? '' : '&';
        var value = params[key];
        query = query + m + key + '=' + value;
      }
      index++;
    }
    url = url + query
  }
  console.log('url:' + url)
  return fetch(url, {
    'Accept': 'text/html,application/xhtml+xm…plication/xml;q=0.9,*/*;q=0.8'
  })
    .then((response) => response.text())
    .then((data) => { return data })
    .catch((error) => { return error });
}