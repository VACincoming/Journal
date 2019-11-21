const userLoaded = (newUser:any) => {
  return{
    type: 'FETCH_USER_SUCCESS',
    payload: newUser
  }
}
const userRequest = () => {
  return{type: 'FETCH_USER_REQUEST'}
}
const loaderOn = () => {
  return {type: 'FETCH_LOADER_ON'}
}
const loaderOff = () => {
  return {type: 'FETCH_LOADER_OFF'}
}

const fetchUserLoaded = () => (user:any) => (dispatch:any) => {
  return dispatch(userLoaded(user))
}
const fetchUserRequest = () => () => (dispatch:any) => {
  return dispatch(userRequest())
}
const fetchLoaderOn = () => () => (dispatch:any) => {
  return dispatch(loaderOn())
}
const fetchLoaderOff = () => () => (dispatch:any) => {
  return dispatch(loaderOff())
}
export {
  fetchUserLoaded,
  fetchUserRequest,
  fetchLoaderOn,
  fetchLoaderOff
}