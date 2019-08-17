import { initalState } from './initalState';
import { types } from './actions';
export const reducer = (state, action) => {
    switch (action.type) {
      case types.INIT_COLOR:
        return { ...state, cardsColor: action.payload };
      case types.ADD_FLIP_COUNT:
        return { ...state, flipCount: state.flipCount + action.payload };
      case types.REVELAL:
        const updateReveal = state.revealed.map(
          (item, i) => i === action.payload.id ? action.payload.status : item
        );
        return { ...state, revealed: updateReveal };
      case types.SET_LAST_CARD:
        return { ...state, lastCard: action.payload }
      case types.HIDE:
        const updateVisible = state.visible.map(
          (item, i) => i === action.payload ? false : item)
        return { ...state, visible: updateVisible };
      case types.SCORE:
        return { ...state, score: state.score + action.payload };
      case types.REMOVE_PAIR:
        return { ...state, pairCount: state.pairCount - action.payload }
      case types.RESET_GAME:
        return { ...initalState };
      default:
        return state;
    }
  }