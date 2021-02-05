import { createContext, useEffect, useReducer } from 'react';
import { orderApis, userApis } from '../services';
import reducers from './reducers';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
    orders: [],
    modal: {},
    users: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;
  //console.log(auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      userApis.getMe().then((res) => {
        if (res.err) return localStorage.removeItem('firstLogin');

        dispatch({
          type: 'AUTH',
          payload: {
            token: res.data.access_token,
            user: res.data?.user,
          },
        });
      });
    }
  }, []);

  useEffect(() => {
    const __next__cart01 = JSON.parse(localStorage.getItem('__next__cart01'));

    if (__next__cart01) dispatch({ type: 'ADD_CART', payload: __next__cart01 });
  }, []);

  useEffect(() => {
    localStorage.setItem('__next__cart01', JSON.stringify(cart));
  }, [cart]);

  useEffect(async () => {
    if (auth.token) {
      await orderApis.getOrders(auth.token).then((res) => {
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
        dispatch({ type: 'ADD_ORDERS', payload: res.orders });
      });

      if (auth.user.role === 'admin') {
        await userApis.getUsers(auth.token).then((res) => {
          //console.log(res);
          if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
          dispatch({ type: 'ADD_USERS', payload: res.data?.users });
        });
      }
    } else {
      dispatch({ type: 'ADD_ORDERS', payload: [] });
      dispatch({ type: 'ADD_USERS', payload: [] });
    }
  }, [auth.token]);

  return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};
