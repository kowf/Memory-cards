import { createStore } from 'redux'
import { reducer } from './redux';
import { initalState } from './initalState';

const store = createStore(reducer, initalState);


export default store;