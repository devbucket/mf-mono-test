import fetch from 'cross-fetch';
import type { User } from '../types';
import { useUserStore } from '../store';

export default async function getUser(username: string, password: string) {
  if (!username || !password) return null;

  const authEndpoint = `${process.env.REACT_APP_API}/user/obtain-auth-token/`;

  const { user } = useUserStore.getState();
  console.warn({ user });

  if (user && user.token) {
    return user;
  }

  try {
    console.log('fetching user ...');
    const response = await fetch(authEndpoint, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const fetchUser = await response.json() as User;
    return fetchUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}
