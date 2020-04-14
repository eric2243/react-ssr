import { combineReducers } from 'redux'
import { reducer as homeReducer } from '../container/home';
import { reducer as topicsReducer } from '../container/topics'

export  default combineReducers({
    home: homeReducer,
    topics: topicsReducer
});
