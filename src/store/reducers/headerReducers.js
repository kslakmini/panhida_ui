import {SHOW_HEADER_ITEMS , HIDE_HEADER_ITEMS} from '../actions/types'

const hideItems = (state = {}, action) => {

    switch (action.type) {
      case SHOW_HEADER_ITEMS:
        return {
          ...state,
          showItems: true,
        };
      case HIDE_HEADER_ITEMS:
        return {
          ...state,
          showItems: false,
        };   
      default:
        return state;
    }
  };
  
  export default hideItems;