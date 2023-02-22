import { LOGIN, LOGOUT, TOGGLE } from '../actions/types';

const initialState = {
  accessToken: sessionStorage.getItem('accessToken'),
  role: sessionStorage.getItem('role'),
  fullName: sessionStorage.getItem('fullName'),
  id: sessionStorage.getItem('id'),
  routes: JSON.parse(sessionStorage.getItem('routes')),
  isDrawerOpen: false,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };

    case LOGOUT:
      return {
        accessToken: '',
        role: '',
        fullName: '',
        id: '',
        routes: '',
        isDrawerOpen: false,
      };

    case TOGGLE:
      return { ...state, isDrawerOpen: !state.isDrawerOpen };

    default:
      return state;
  }
}
