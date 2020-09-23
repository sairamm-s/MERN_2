import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const intialState = [];

export default function (state = intialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload]; //we must return state i.e already there ,state is immutable

    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.id);
    default:
      return state;
  }
}
