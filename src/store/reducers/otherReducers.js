// value === 'gg' ? ' - Go Green' : ' - Agrowcell'
import { COMPANY_SWITCH } from '../actions/types';

const initialState = {
  company: 'gg',
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case COMPANY_SWITCH:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
