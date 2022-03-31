let user, authToken, isAuth;

try {
  user = JSON.parse(localStorage.getItem('auth')).user;
  authToken = JSON.parse(localStorage.getItem('auth')).authToken;
  isAuth = JSON.parse(localStorage.getItem('auth')).isAuth;
} catch {
  user = null;
  authToken = null;
}

user = user ?? {
  nickname: '',
  avatarPath: '',
  role: '',
};

authToken = authToken ?? {
  token: null,
  abilities: '',
};


const initialState = {
  auth: {
    user,
    authToken,
    isAuth,
  },
};



function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
