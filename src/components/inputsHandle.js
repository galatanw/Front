export function verifyInp(state, action) {
 switch (action.type) {
  case 'password':
   if (
    validInputs(
     state.email,
     action.value,
     !action.login ? state.confirmPassword : null
    )
   ) {
    return { ...state, Valid: false, [action.type]: action.value };
   }
   return { ...state, Valid: true, [action.type]: action.value };
  case 'email':
   if (
    validInputs(
     action.value,
     state.password,
     !action.login ? state.confirmPassword : null
    )
   ) {
    return { ...state, Valid: false, [action.type]: action.value };
   }
   return { ...state, Valid: true, [action.type]: action.value };
  case 'confirmPassword':
   if (validInputs(state.email, state.password, action.value)) {
    return { ...state, Valid: false, [action.type]: action.value };
   }
   return { ...state, Valid: true, [action.type]: action.value };
   default:
     break
 }
}

function validInputs(email, password, confirmPassword) {
 if (email === undefined) email = '';
 if (password === undefined) password = '';
 if (confirmPassword === undefined) confirmPassword = '';
 if (confirmPassword === null) confirmPassword = password;
 const userValidation = [];
 const emailHost = email.match(/@[A-Za-z](.)/);
 if (emailHost)
  if (emailHost[0][1].match(/[a-zA-z]/)) userValidation.push('emailHost');
 if (email.match(/@/g)?.length === 1) userValidation.push('@');
 if (email.match(/.com/gi)?.length === 1) userValidation.push('.com');
 if (email.match(/.co.il/gi)?.length === 1) userValidation.push('.co.il');
 if (email.match(/.org/gi)?.length === 1) userValidation.push('.org');
 if (email.match(/.net/gi)?.length === 1) userValidation.push('.net');
 if (password.match(/[A-Z]/g)) userValidation.push('capitalcase');
 if (password.match(/[a-z]/g)) userValidation.push('lowercase');
 if (password.match(/[1-9]/g)) userValidation.push('numeric');
 if (
  !email.match(/^[A-za-z]/) ||
  password.match(/[^A-Za-z0-9]/g) ||
  email.match(/[^A-Za-z0-9(.)@]/g)
 )
  return false;
 if (password.length > 5 &&userValidation.length===6&&confirmPassword === password) return true;
 return false;
}
export function ChangePasswordValidation(password, newPassword, oldPassword) {
 const passwords = [password, newPassword, oldPassword];
 const passwordsValidation = [];
 for (let index = 0; index < passwords.length; index++) {
  const passwordTest = passwords[index];
  if (passwordTest.match(/[A-Z]/g)) passwordsValidation.push('capitalcase');
  if (passwordTest.match(/[a-z]/g)) passwordsValidation.push('lowercase');
  if (passwordTest.match(/[1-9]/g)) passwordsValidation.push('numeric');
  if (passwordTest.match(/[^A-Za-z0-9]/g)) passwordsValidation.push('notValid');
  if (passwordTest?.length < 5) passwordsValidation.push('notValid');
 }
 if (
  passwordsValidation.length === 9 &&
  passwordsValidation.indexOf('notValid') === -1
 )
  return true;
 return false;
}
