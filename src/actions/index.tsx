import {IUser, IUsers, ISchedule, IScheduleTime, IRegistry, ISubjects} from '../interfaces/Interfaces'

const userLoaded = (newUser:IUser) => {
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
const scheduleSuccess = (schedule:ISchedule) => {
  return {type: 'FETCH_SCHEDULE_SUCCESS', payload: schedule}
}
const scheduleTimeSuccess = (scheduleTime:IScheduleTime) => {
  return {type: 'FETCH_SCHEDULE_TIME_SUCCESS', payload: scheduleTime}
} 
const allUsersLoaded = (newUsers:IUsers) => {
  return{
    type: 'FETCH_ALL_USERS_SUCCESS',
    payload: newUsers
  }
}
const registryLoaded = (registry:IRegistry) => {
  return {
    type: 'FETCH_REGISTRY_SUCCESS',
    payload: registry
  }
}
const subjectsLoaded = (subjects:ISubjects) => {
  return{
    type: "FETCH_SUBJECTS_SUCCESS",
    payload: subjects
  }
}
const fetchSubjects = (journalService:any) => () => (dispatch:any) => {
  return journalService.getSubjects()
    .then((subjects:any) => dispatch(subjectsLoaded(subjects)))
}
const fetchRegistry = (journalService:any) => (date:string) => (dispatch:any) => {
  return journalService.getRegistry(date)
    .then((registry:any) => dispatch(registryLoaded(registry)))
}
const fetchGetAllUsers = (journalService:any) => () => (dispatch:any) => {
  return journalService.getAllUsers()
    .then((users:IUsers) => dispatch(allUsersLoaded(users)))
}
const fetchGetUser = (journalService:any) => () => (dispatch:any) => {
    return journalService.getUser()
      .then((user:any) => dispatch(userLoaded(user.data.data)))
      .catch(() => null)
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
const fetchUserLoaded = () => (user:IUser) => (dispatch:any) => {
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
  fetchRegistry,
  fetchSubjects,
  fetchScheduleTime,
  fetchGetAllUsers,
  fetchGetUser,
  fetchSchedule,
  fetchUserLoaded,
  fetchUserRequest,
  fetchLoaderOn,
  fetchLoaderOff
}