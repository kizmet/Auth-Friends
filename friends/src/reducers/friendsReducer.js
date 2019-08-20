  import {
  FETCH_FRIENDS,
  FETCH_FRIENDS_SUCCESS,
  REQUEST_ERROR,
  SAVE_FRIEND,
  SAVE_FRIEND_SUCCESS,
  UPDATE_FRIEND,
  UPDATE_FRIEND_SUCCESS,
  DELETE_FRIEND,
  DELETE_FRIEND_SUCCESS,
  LOGIN,
  LOGIN_SUCCESS,
  LOAD_TOKEN,
} from '../actions';


const initialState = {  
  deletingFriend: false,
  fetchingFriends: false,
  friends: [],
  loggingIn: false,
  savingFriend: false,
  updatingFriend: false,
  error: null,
  token: null,
  loggedIn: false,
};

export const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TOKEN:
      return { ...state, loggedIn: true, token: action.payload };
    case LOGIN:
      return { ...state, fetchingFriends: true };
    case LOGIN_SUCCESS:
      return { ...state, loggingIn: false, token: action.payload, loggedIn: true };
    case FETCH_FRIENDS:
      return { ...state, fetchingFriends: true };
    case FETCH_FRIENDS_SUCCESS:
      return { ...state, friends: action.payload, fetchingFriends: false };
    case SAVE_FRIEND:
      return { ...state, savingFriend: true };
    case SAVE_FRIEND_SUCCESS:
      return { ...state, friends: action.payload, savingFriend: false };
    case UPDATE_FRIEND:
      return { ...state, updatingFriend: true };
    case UPDATE_FRIEND_SUCCESS:
      return { ...state, friends: action.payload, updatingFriend: false };
    case DELETE_FRIEND:
      return { ...state, deletingFriend: true };
    case DELETE_FRIEND_SUCCESS:
      return { ...state, friends: action.payload, deletingFriend: false };
    case REQUEST_ERROR:
      return { ...initialState, friends: state.friends, error: action.payload };
    default:
      return state;
  }
};