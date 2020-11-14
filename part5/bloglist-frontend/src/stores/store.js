import { createStore } from 'redux'
import notificationReducer from '../reducers/notificationReducer'

const reducer = notificationReducer

export default createStore(reducer)