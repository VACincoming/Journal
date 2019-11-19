import JournalService from "../services/journal-service"

const userLoaded = (newUser:any) => {
  return{
    type: 'FETCH_USER_SUCCESS',
    payload: newUser
  }
}
const userRequest = () => {
  return{
    type: 'FETCH_USER_REQUEST'
  }
}
const userError = (err:any) => {
  return{
    type: 'FETCH_USER_ERROR',
    payload: err
  }
}

const fetchUserLoaded = () => (user:any) => (dispatch:any) => {
  return dispatch(userLoaded(user))
}
const fetchUserRequest = () => () => (dispatch:any) => {
  return dispatch(userRequest())
}
export {
  fetchUserLoaded,
  fetchUserRequest
}