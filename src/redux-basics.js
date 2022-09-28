const { configureStore } = require("@reduxjs/toolkit"); // load module in Node.js
const initialState = { number: 0 }; // default state
// create redux store
const store = configureStore({ reducer: reducer });
console.log(store.getState());

store.dispatch({ type: "ADD" });
store.dispatch({ type: "ADD_VALUE", value: 5 });
console.log(store.getState());

const reducer = (state = initialState, action) => {
    if (action.type === "ADD") {
        return { ...state, number: state.number + 1 };
    } else if (action.type === "ADD_VALUE") {
        return { ...state, number: state.number + action.value };
    }
    return state;
};

store.subscribe(() => {
    console.log("[Subscription]", store.getState());
});
