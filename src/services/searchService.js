// https://m.baidu.com/from=844b/s?pn=${page}0&usm=1&word=site%3Acnodejs.org+${content}
import * as requestService from './request'
import * as find from '../actions/find';
import cheerio from 'cheerio-without-node-native';
const url = 'https://m.baidu.com/from=844b/s'

export const getSearchTopics = (params = {
  pn: 1,
  usm: 1,
  word: 'site:cnodejs.org+cnode'
}) => {
  return (dispatch) => {
    dispatch(find.loading(true))
    get(url, {
      ...params
    }).then((data) => {
      console.log('searchTopics')
      console.log(data)
      dispatch(find.searchTopics(data))
    }).catch((error) => {
    }) // 
  }
}
const get = (url, params) => {
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
    .then((data) => { return parseSearch(data) })
    .catch((error) => { return error });
}

const parseSearch = (data) => {
  const $ = cheerio.load(data);
  var lists = [];
  const results = $('#results .c-result')
  console.log(results)
  results.each(function (i, elem) {
    const dataLog = $(this).attr('data-log').replace(/'/g, '"')
    const id = JSON.parse(dataLog).mu.replace(/.*?topic\/(.*?)$/, '$1')
    const title = $(this).find('h3').text()
    const content = $(this).find('p').text()
    const list = { id, title, content };
    if (id.length == 24) lists.push(list) // 话题ID长度
  });
  console.log('lists')
  console.log(lists)
  return lists;
}