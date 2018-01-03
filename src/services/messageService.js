import * as requestService from "./request";
import * as message from "../actions/message";

export const getMessage = (parms) => {
  return dispatch => {
    dispatch(message.loading(true));
    requestService
      .get("/messages", parms)
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(message.message(data.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};