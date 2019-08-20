import axiosAuth from "../utils";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCESS = "LOGIN_SUCCESS";
export const GET_FRIENDS = "GET_FRIENDS";
export const GET_FRIENDS_SUCCESS = "GET_FRIENDS_SUCCESS";
export const GET_FRIENDS_FAILURE = "GET_FRIENDS_FAILURE";

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axiosAuth()
  .post('http://localhost:5000/api/login', creds)
  .then(res => {
    localStorage.setItem('token', res.data.payload);
    dispatch({ type: LOGIN_SUCESS, payload: res.data.payload });
    console.log(res);
  })
  .catch(err => {
    console.log(err.message)
  })
};

export const getFriends = () => dispatch => {
  dispatch({ type: GET_FRIENDS, payload: localStorage.getItem('token')})
  axiosAuth().get('http://localhost:5000/api/friends')
  .then(res => {
    console.log(res);
    dispatch({ type: GET_FRIENDS_SUCCESS, payload: res.data })
  })
  .catch(err => {
    console.log(err)
    dispatch({ type: GET_FRIENDS_FAILURE, payload: err.message })
  })
}
