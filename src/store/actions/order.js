import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (errorMessage) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: errorMessage,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const puchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());

    axios.post('/orders.json', orderData)
      .then(res => {
        console.log(res.data);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (errorMessage) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: errorMessage,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());

    axios.get('/orders.json').then(res => {
      const fetchedOrders = Object.entries(res.data).map(([key, value]) => {
        return {...value, id: key}
      })
      console.log(fetchedOrders);
      dispatch(fetchOrdersSuccess(fetchedOrders));
    }).catch(err => dispatch(fetchOrdersFail(err)));
  };
};
