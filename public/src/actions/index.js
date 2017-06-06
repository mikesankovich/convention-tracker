import {signIn, signUp, userEdit, getUser, getUserProfile, deleteConvention} from './funcs/user';
import {getConvention, getAllConventions, getMyConventions, createConvention, edit} from './funcs/convention';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_INFO,
  fetch_profile,
  FETCH_CONVENTIONS,
  FETCH_MY_CONVENTIONS,
  NEW_CONVENTION,
  FETCH_SINGLE_CONVENTION,
  EDIT_CONVENTION,
  EDIT_USER,
} from './types';

//USER FUNCTIONS
export function signinUser({email, password}) {
  return function(dispatch) {
    signIn(dispatch, {email, password})
  }
}
export function signupUser({email, password, username}) {
  return function(dispatch) {
    signUp(dispatch, {email, password, username})
  }
}
export function editUser({phoneNumber, email, lang, aboutMe}, user) {
  return function(dispatch) {
    userEdit(dispatch, {phoneNumber, email, lang, aboutMe}, user)
  }
}
export function removeConvention(id) {
  console.log(id)
  return function(dispatch) {
    deleteConvention(id, dispatch)
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER};
}
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchInfo() {
  return function(dispatch) {
    getUser(dispatch);
  }
}
export function fetchProfileInfo(userId) {
  return function(dispatch) {
    getUserProfile(dispatch, userId);
  }
}
//Convention FUNCTIONS
export function fetchConventions(term, otherParams) {
  return function(dispatch) {
    getAllConventions(term, otherParams, dispatch)
  }
}
export function fetchMyConventions(array) {
  return function(dispatch) {
    getMyConventions(array, dispatch);
  }
}
export function newConvention(data) {
  return function(dispatch) {
    createConvention(data, dispatch);
  }
}

export function fetchSingleConvention(id) {
  return function(dispatch) {
    getConvention(id, dispatch)
  }
}
export function editConvention({convention}, userId) {
  return function(dispatch) {
    edit({convention}, userId, dispatch)
  }
}
