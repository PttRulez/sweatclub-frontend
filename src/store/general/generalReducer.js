function reducer(state = {pageTitle: 'Sweat CLUB'}, action) {
  switch (action.type) {
    case 'SET_PAGE_TITLE':
      
      return {
        ...state,
        pageTitle: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;