const types = {
    INIT_COLOR: 'INIT_COLOR',
    FLIP: 'FLIP_CARD',
    SET_SCORE: 'SET_SCORE',
    DECRE_PAIRSLEFT: 'DECRE_PAIRSLEFT',
    RESET_GAME: 'RESET GAME',
    ADD_CURRENT_CARD: 'ADD_CURRENT_CARD',
    REMOVE_CURRENT_CARDS: 'REMOVE_CURRENT_CARDS'
  }

export const actionCreators = {
  setColor: (colors) => {
    return {
      type: types.INIT_COLOR,
      payload: colors  
    };
  }
}

export const reducer = (state, action) => {
  switch (action.type){
    case types.INIT_COLOR:
      return {...state, cardsColor: action.payload};
    default:
      return state;
  }
}