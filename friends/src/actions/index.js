import axios from "axios";
let axiosWithAuth = () => axios.create();

export const FETCH_FRIENDS = "FETCH_FRIENDS";
export const FETCH_FRIENDS_SUCCESS = "FETCH_FRIENDS_SUCCESS";
export const REQUEST_ERROR = "REQUEST_ERROR";
export const SAVE_FRIEND = "SAVE_FRIEND";
export const SAVE_FRIEND_SUCCESS = "SAVE_FRIEND_SUCCESS";
export const UPDATE_FRIEND = "UPDATE_FRIEND";
export const UPDATE_FRIEND_SUCCESS = "UPDATE_FRIEND_SUCCESS";
export const DELETE_FRIEND = "DELETE_FRIEND";
export const DELETE_FRIEND_SUCCESS = "DELETE_FRIEND_SUCCESS";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOAD_TOKEN = "LOAD_TOKEN";
export const LOG_OUT = "LOG_OUT";

const url = "https://cqio3-5000.sse.codesandbox.io";
export const logOut = () => ({
  type: LOG_OUT
});

const axiosAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  });
};

export const loadToken = t => {
  axiosWithAuth = () =>
    axios.create({
      headers: {
        "Content-Type": "application/json",
        authorization: t
      }
    });
  return {
    type: LOAD_TOKEN,
    payload: t
  };
};

export const login = credentials => dispatch => {
  dispatch({ type: LOGIN });
  return axios.post(url + "/api/login", credentials).then(res => {
    localStorage.setItem("token", res.data.payload);
    axiosWithAuth = () =>
      axios.create({
        headers: {
          "Content-Type": "application/json",
          authorization: `${res.data.payload}`
        }
      });
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.payload });
  });
};

export const fetchFriends = () => dispatch => {
  dispatch({ type: FETCH_FRIENDS });
  return axiosWithAuth()
    .get(url + "/api/friends")
    .then(({ data }) =>
      dispatch({ type: FETCH_FRIENDS_SUCCESS, payload: data })
    )
    .catch(err => dispatch({ type: REQUEST_ERROR, payload: err }));
};

export const saveFriend = friend => dispatch => {
  dispatch({ type: SAVE_FRIEND });
  return axiosWithAuth()
    .post(url + "/api/friends", friend)
    .then(({ data }) => dispatch({ type: SAVE_FRIEND_SUCCESS, payload: data }))
    .catch(err => dispatch({ type: REQUEST_ERROR, payload: err }));
};

export const updateFriend = friend => dispatch => {
  dispatch({ type: UPDATE_FRIEND });
  return axiosWithAuth()
    .put(`${url}/api/friends/${friend.id}`, friend)
    .then(({ data }) =>
      dispatch({ type: UPDATE_FRIEND_SUCCESS, payload: data })
    )
    .catch(err => dispatch({ type: REQUEST_ERROR, payload: err }));
};

export const deleteFriend = id => dispatch => {
  dispatch({ type: DELETE_FRIEND });
  return axiosWithAuth()
    .delete(`https://cqio3-5000.sse.codesandbox.io/api/friends/${id}`, id)
    .then(({ data }) => {
      dispatch({
        type: DELETE_FRIEND_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: REQUEST_ERROR,
        payload: err
      });
    });
};
