

const types = {
    INIT_COLOR: 'INIT_COLOR',
    ADD_FLIP_COUNT: 'ADD_FLIP_COUNT',
    REVELAL: 'REVEAL',
    SET_LAST_CARD: 'SET_LAST_CARD',
    HIDE: 'HIDE',
    SCORE: 'SCORE',
    REMOVE_PAIR: 'REMOVE_PAIR',
  }

export const actionCreators = {
  setColor: (colors) => {
    return {
      type: types.INIT_COLOR,
      payload: colors  
    };
  },
  addFlipCount: (count) => {
    return {
      type: types.ADD_FLIP_COUNT,
      payload: count
    };
  },
  reveal: (id, status) => {
    return {
      type: types.REVELAL,
      payload: { id: id, status: status}
    }
  },
  setLastCard: (id, color) => {
    return {
      type: types.SET_LAST_CARD,
      payload: { id: id, color: color}
    }
  },
  hide: (id) => {
    return {
      type: types.HIDE,
      payload: id
    }
  },
  score: (amount) => {
    return {
      type: types.SCORE,
      payload: amount
    }
  },
  removePair: (amount) => {
    return {
      type: types.REMOVE_PAIR,
      payload: amount
    }
  }
}

export const reducer = (state, action) => {
  switch (action.type){
    case types.INIT_COLOR:
      return {...state, cardsColor: action.payload};
    case types.ADD_FLIP_COUNT:
      return {...state, flipCount: state.flipCount + action.payload};
    case types.REVELAL:
      const updateReveal = state.revealed.map(
        (item, i ) =>  i === action.payload.id ? action.payload.status : item
      );
      return {...state, revealed: updateReveal};
    case types.SET_LAST_CARD:
      return {...state, lastCard: action.payload}
    case types.HIDE:
      
      const updateVisible = state.visible.map(
        (item, i) => i === action.payload ? false : item)
      return {...state, visible: updateVisible};
    case types.SCORE:
      return {...state, score: state.score + action.payload};
    case types.REMOVE_PAIR:
      return {...state, pairCount: state.pairCount - action.payload}
    default:
      return state;
  }
}