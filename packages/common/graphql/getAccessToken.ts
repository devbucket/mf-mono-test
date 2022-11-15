import { useUserStore } from '../store';
import getUser from './getUser';

/** Obtains an access token */
export default function getAccessToken(username: string, password: string) {
  if (!username || !password) return Promise.resolve();
  console.log(`%cLINK: ⚙️ Obtaining user access token for user ${username} ...`, 'color: cyan');

  return getUser(username, password)
    .then((user) => {
      console.log('%cLINK: ✅ Successfully retrieved access token.\n', 'color: cyan');
      useUserStore.setState({ user });
      return user.access;
    })
    .catch((error) => {
      console.log('%cLINK: ⛔ An error occured:', 'color: red');
      return error;
    });
}
