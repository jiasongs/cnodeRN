import * as requestService from './request'
import * as user from '../actions/user';
import cheerio from 'cheerio-without-node-native';
import { moment } from '../utils/tools';


export const getUserFavorites = (query = '') => {
  return (dispatch) => {
    var url = '/topic_collect/'
    url = url + query
    requestService.get(url, {})
      .then((data) => {
        console.log(data)
        dispatch(user.userFavorites(data.data))
      }).catch((error) => {

      }) // 
  }
}

export const getUserRecently = (query = '') => {
  return (dispatch) => {
    var url = '/user/'
    url = url + query
    requestService.get(url, {})
      .then((data) => {
        console.log(data)
        dispatch(user.userRecently(data.data))
      }).catch((error) => {

      }) // 
  }
}

export const getUserInfo = (query = '') => {
  return (dispatch) => {
    var url = 'https://cnodejs.org/user/'
    url = url + query
    dispatch(user.loading(true))
    requestService.getHTML(url, {})
      .then((data) => {
        dispatch(user.userInfo(parseInfo(data)))
      }).catch((error) => {

      }) // 
  }
}

const parseInfo = (data) => {
  const $ = cheerio.load(data);
  let avatar_url = $('.user_big_avatar img').attr('src')
  if (avatar_url && !avatar_url.startsWith('https')) avatar_url = 'https:' + avatar_url
  const name = $('.user_big_avatar img').attr('title')
  const home = $('.unstyled .fa-home').next().text().length > 0 ? $('.unstyled .fa-home').next().text() : "未填写"
  const location = $('.unstyled .fa-map-marker').next().text().length > 0 ? $('.unstyled .fa-map-marker').next().text() : "未填写"
  const weibo = $('.unstyled .fa-twitter').next().text().length > 0 ? $('.unstyled .fa-twitter').next().text() : "未填写"
  const signature = $('.user_card .signature').text().replace(/[\r\n\s“”]/g, '')
  return { home, location, weibo, name, avatar_url, signature };
}