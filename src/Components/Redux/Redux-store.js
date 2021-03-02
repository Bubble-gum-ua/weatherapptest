import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {mainReducer} from "./mainReducer";
import {cardsReducer} from "./Card-reducers";

const {combineReducers} = require("redux");

let reducers = combineReducers({
    cities: cardsReducer,
    main: mainReducer
})

const store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store;
export default store;