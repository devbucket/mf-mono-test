import fetch from 'cross-fetch';

export default function getUser(username: string, password: string) {
  return new Promise((resolve, reject) => {
    const { state } = JSON.parse(window.localStorage.getItem('link:user') || JSON.stringify({ state: { user: null } }));
    const currentUser = state.user;

    if (currentUser) {
      resolve(currentUser);
      return;
    }

    if (!username || !password) {
      reject(new Error('No username or password provided'));
      return;
    }

    const authEndpoint = `${process.env.REACT_APP_API ?? ''}/user/obtain-auth-token/`;
    fetch(authEndpoint, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then(({ user }) => {
        resolve(user);
      })
      .catch((error) => {
        console.error(error);
        resolve(null);
      });
  });
}
