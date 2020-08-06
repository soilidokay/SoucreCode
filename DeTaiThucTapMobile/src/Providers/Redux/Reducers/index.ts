import {combineReducers} from 'redux';
const stateDefault = {};
const Test = (state = stateDefault, action: any): any => {
  switch (action) {
    case 'value':
      break;

    default:
      break;
  }
  return {...state};
};

export default combineReducers({Test});
