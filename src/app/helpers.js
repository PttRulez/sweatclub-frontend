import store from "../store/store";

export const generateAvatar = (nickname) => {
  return `https://ui-avatars.com/api/?name=${nickname}&background=random&color=eee`
}

export const setAuth = (authData) => {
  const authObj = createAuthObj(authData);
  store.dispatch({ type: 'SET_AUTH', payload: authObj })
  localStorage.setItem('auth', JSON.stringify(authObj));
}

export const createAuthObj = (authData) => {
  return {
    authToken: authData.authToken,
    isAuth: true,
    user: {
      ...authData.user,
      avatarUrl: authData.user.avatarUrl?? generateAvatar(authData.user.nickname),
      isAdmin: authData.authToken?.abilities.map(a => a.toLowerCase()).includes('admin')
    },
  };
}

export const getStoreLocal = (name) => {
  if(typeof localStorage !== 'undefined') {
    const ls = localStorage.getItem(name)
    return ls ? JSON.parse(ls) : null
  }
  return null
}
