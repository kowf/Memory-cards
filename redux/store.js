import { createStore } from 'redux'
import { reducer } from './redux';
//DEBUG revealed should be false
const initalState = {
    cardsColor: Array(16).fill(null),
    revealed: Array(16).fill(false),
    visible: Array(16).fill(true),
    flipCount: 1,
    lastCard: {id: 20, color: 20},
    score: 0,
    pairCount: 8
}
const store = createStore(reducer, initalState);


export default store;