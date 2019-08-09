import { createStore } from 'redux'
import { reducer } from './redux';

const initalState = {
    cardsColor: Array(16).fill(null)
}
const store = createStore(reducer, initalState);


export default store