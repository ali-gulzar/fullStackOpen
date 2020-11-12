import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anectodeReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import filterReducer from '../reducers/filterReducer'

const reducer = combineReducers({ notification: notificationReducer, anectode: anectodeReducer, filter: filterReducer })

export default createStore(reducer, composeWithDevTools())