import * as actionTypes from '../actions/actionTypes';

const initialState ={
  orders: [],
  loading: false,
  purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = { ...action.orderData, id: action.orderId };
  return {
    ...state,
    loading: false,
    orders: [...state.orders, newOrder],
    purchased: true
  };
};

const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: action.orders
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return { ...state, loading: false };
    case actionTypes.PURCHASE_BURGER_START: return { ...state, loading: true };
    case actionTypes.PURCHASE_INIT: return { ...state, purchased: false };
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return { ...state, loading: false };
    case actionTypes.FETCH_ORDERS_START: return { ...state, loading: true };
    default: return state;
  }
};

export default reducer;
