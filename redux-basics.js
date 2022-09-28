const { configureStore } = require("@reduxjs/toolkit"); // load module in Node.js
const initialState = { number: 0 }; // default state

// create identity reducer
const reducer = (state = initialState, action) => {
  return state;
};

// create redux store
const store = configureStore({ reducer: reducer });
console.log(store.getState());
