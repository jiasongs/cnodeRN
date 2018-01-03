import * as requestService from "./request";
import * as login from "../actions/login";

export const sendLogin = (body, func) => {
  return dispatch => {
    dispatch(login.loading(true));
    requestService
      .post("/accesstoken", body)
      .then(data => {
        console.log(data)
        dispatch(login.gotoLogin(data, body, func));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
