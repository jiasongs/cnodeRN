import * as requestService from "./request";
import * as mine from "../actions/mine";

export const sendLogin = (body, func) => {
  return dispatch => {
    dispatch(mine.loading(true));
    requestService
      .post("/accesstoken", body)
      .then(data => {
        dispatch(mine.gotoLogin(data, func));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
