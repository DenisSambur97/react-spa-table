import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer';

const rootReducer = combineReducers({
    users: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
