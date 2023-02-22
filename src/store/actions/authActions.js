import { LOGIN, LOGOUT, TOGGLE } from './types';
import axios from 'axios';
import { routes } from '../../routes';

export const login =
  (fullName, role, accessToken, permissions, id) => (dispatch) => {
    try {
      let permittedRoutes;
      if (role === 'admin') {
        // eslint-disable-next-line
        permittedRoutes = routes.filter((route) => {
          // eslint-disable-line
          const children = route.children;

          const intersection = children.filter((element) => !element.isHidden);
          if (intersection.length) {
            route.children = intersection;
            return route;
          }
        });
      } else {
        permittedRoutes = routes.filter((route) => {
          return route;
        });
      }
      // save to the session storage
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('fullName', fullName);
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('routes', JSON.stringify(permittedRoutes));
      sessionStorage.setItem('id', id);

      axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
        'accessToken'
      )}`;

      dispatch({
        type: LOGIN,
        payload: { accessToken, fullName, role, routes: permittedRoutes, id },
      });
    } catch (error) {}
  };

export const logout = () => (dispatch) => {
  // remove items from session storage
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('fullName');
  sessionStorage.removeItem('role');
  sessionStorage.removeItem('routes');
  sessionStorage.removeItem('id');

  axios.defaults.headers.common.Authorization = null;

  dispatch({
    type: LOGOUT,
  });
};

export const toggleDrawer = () => (dispatch) => {
  dispatch({
    type: TOGGLE,
  });
};
