import getUser from './getUser';

/** Obtains an access token */
export default function getAccessToken(username: string, password: string) {
  if (!username || !password) return Promise.resolve(null);
  console.log(`%cLINK: ⚙️ Obtaining user access token for user ${username} ...`, 'color: cyan');

  return getUser(username, password)
    .then((user) => {
      console.log('%cLINK: ✅ Successfully retrieved access token.\n', 'color: cyan');
      // window.localStorage.setItem('link:user', { state: { user: JSON.stringify(user) }, version: 0 });
      return user.access;
    })
    .catch((error) => {
      console.log('%cLINK: ⛔ An error occured:', 'color: red');
      console.error(error);
      return null;
    });
}
