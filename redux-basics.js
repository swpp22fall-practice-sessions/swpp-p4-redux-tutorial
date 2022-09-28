const { configureStore } = require('@reduxjs/toolkit');
const initialState = { number: 0}

const reducer = (state = initialState, action) => {
    return state;
}

const store = configureStore({reducer: reducer});
console.log(store.getState());