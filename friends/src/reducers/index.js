import { GET_FRIENDS, GET_FRIENDS_SUCCESS, GET_FRIENDS_FAILURE } from '../actions';
import axios from 'axios';

const initialState = {
  friends: [],
  error: null,
  fetching: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS:
    return {
      ...state,
      fetching: true
    }
    case GET_FRIENDS_SUCCESS:
    return {
      ...state,
      friends: action.payload,
      fetching: false
    }
    case GET_FRIENDS_FAILURE:
    return {
      ...state,
      fetching: false,
      error: action.payload
    }
    default:
      return state;
  }
};

export default reducer
