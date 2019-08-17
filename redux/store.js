import { createStore } from 'redux'
import { reducer } from './reducer';
import { initalState } from './initalState';

const store = createStore(reducer, initalState);


export default store;