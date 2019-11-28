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
const scheduleSuccess = (schedule:any) => {
  return {type: 'FETCH_SCHEDULE_SUCCESS', payload: schedule}
}
const scheduleTimeSuccess = (scheduleTime:any) => {
  return {type: 'FETCH_SCHEDULE_TIME_SUCCESS', payload: scheduleTime}
} 
const allUsersLoaded = (newUsers:any) => {
  return{
    type: 'FETCH_ALL_USERS_SUCCESS',
    payload: newUsers
  }
}

const fetchGetAllUsers = (journalService:any) => () => (dispatch:any) => {
  return journalService.getAllUsers()
    .then((users:any) => dispatch(allUsersLoaded(users)))
}
const fetchGetUser = (journalService:any) => () => (dispatch:any) => {
  return journalService.getUser()
    .then((user:any) => dispatch(userLoaded(user.data.data))
  )
}
const fetchSchedule = (journalService:any) => (weekType:string) => (dispatch:any) => {
  return journalService.getSchedule(weekType)
    .then((schedule:any) => dispatch(scheduleSuccess(schedule.data.data)))
    .catch((err:any) => console.log(err))
}
const fetchScheduleTime = (journalService:any) => () => (dispatch:any) => {
  return journalService.getScheduleTime()
    .then((scheduleTime:any) => dispatch(scheduleTimeSuccess(scheduleTime.data.data)))
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
  fetchScheduleTime,
  fetchGetAllUsers,
  fetchGetUser,
  fetchSchedule,
  fetchUserLoaded,
  fetchUserRequest,
  fetchLoaderOn,
  fetchLoaderOff
}