import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { AuthReducer } from '../Reducers/AuthReducer'
import { notesReducer } from '../Reducers/notesReducer';
import { uiReducer } from '../Reducers/uiReducer';
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reducers = combineReducers({
    auth: AuthReducer,
    ui: uiReducer,
    notes: notesReducer
})

export const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
))