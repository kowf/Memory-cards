export const types = {
  INIT_COLOR: 'INIT_COLOR',
  ADD_FLIP_COUNT: 'ADD_FLIP_COUNT',
  REVELAL: 'REVEAL',
  SET_LAST_CARD: 'SET_LAST_CARD',
  HIDE: 'HIDE',
  SCORE: 'SCORE',
  REMOVE_PAIR: 'REMOVE_PAIR',
  RESET_GAME: 'RESET_GAME',
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
      payload: { id: id, status: status }
    }
  },
  setLastCard: (id, color) => {
    return {
      type: types.SET_LAST_CARD,
      payload: { id: id, color: color }
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
  },
  resetGame: () => {
    return {
      type: types.RESET_GAME
    }
  },
}

