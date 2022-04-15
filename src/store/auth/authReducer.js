import { createAuthObj } from '../../app/helpers';

let user, authToken, isAuth;
const localAuth = JSON.parse(localStorage.getItem('auth'));
try {
  user = localAuth.user;
  authToken = localAuth.authToken;
  isAuth = localAuth.isAuth;
} catch {
  user = null;
  authToken = null;
}

user = user
  ? createAuthObj(localAuth).user
  : {
      nickname: '',
      avatarUrl: '',
      role: '',
    };

authToken = authToken ?? {
  token: null,
  abilities: [],
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
