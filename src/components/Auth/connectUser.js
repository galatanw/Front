import axios from 'axios';
import { LOGGED_USER, FIREBASE_key } from '../../KEYS';
export default async function setAuth(
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
  const time =new Date().getTime();
  const twentyMinInMs=1000*60*20
  userRequest.experationTimeBook =time+twentyMinInMs;
  console.log(userRequest.experationTimeBook);
  localStorage.setItem(LOGGED_USER, JSON.stringify(userRequest));
  SetUser(userRequest);
  SetErr(null);
 } catch (error) {
  console.log(error);
  SetErr(error.response);
 } finally {
  SetLoading(false);
 }
}
