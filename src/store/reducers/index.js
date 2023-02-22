import { combineReducers } from 'redux';
import authReducer from './authReducer';
import otherReducers from './otherReducers';
import hideItems from './headerReducers'

export default combineReducers({
  auth: authReducer,
  other: otherReducers,
  header: hideItems
});
