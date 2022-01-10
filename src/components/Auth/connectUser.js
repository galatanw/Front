const LOGGED_USER = 'Auth';
import axios from 'axios';
import { FIREBASE_key } from '../../../KEYS';
export default async function useAuth(
 isUserExist,
 userInfo,
 SetUser,
 SetLoading,
 SetErr
) {
 let userEnterMethod;
 if (isUserExist) userEnterMethod = 'signInWithPassword';
 else userEnterMethod = 'signUp';
 let url = `https://identitytoolkit.googleapis.com/v1/accounts:${userEnterMethod}?key=${FIREBASE_key}`;
 try {
  userInfo['returnSecureToken'] = true;
  const userRequest = await axios.post(url, userInfo);
  localStorage.setItem(LOGGED_USER, JSON.stringify(userRequest));
  SetUser(userRequest);
  SetErr(null);
 } catch (error) {
  console.log(error.response);
  SetErr(error.response);
 } finally {
  SetLoading(false);
 }
}
