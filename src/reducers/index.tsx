interface IInitialState{
  user: []
  users: []
  loading: boolean
  error: any
  schedule: []
  scheduleTime: []
  registry: []
  userAbsents: []
  subjects: []
  language: string
  
}
const initialState:IInitialState = {
  user: [],
  users: [],
  loading: true,
  error: null,
  schedule: [],
  userAbsents: [],
  scheduleTime: [],
  registry: [],
  subjects: [],
  language: 'ua'
}

const reducer = (state:any = initialState, action:any) => {
  switch(action.type){
    case 'FETCH_LANGUAGE_SUCCESS':
      return {
        ...state,
        language: action.payload,
      }
    case 'FETCH_USER_ABSENTS':
      return {
        ...state,
        userAbsents: action.payload,
      }
    case 'FETCH_REGISTRY_SUCCESS':
      return{
        ...state,
        registry: action.payload,
        error: null
      }
    case 'FETCH_SUBJECTS_SUCCESS':
      return{
        ...state,
        subjects: action.payload,
        error: null
      }
    case 'FETCH_SCHEDULE_TIME_SUCCESS':
      return{
        ...state,
        scheduleTime: action.payload,
        error: null
      }
    case 'FETCH_SCHEDULE_SUCCESS':
      return{
        ...state,
        schedule: action.payload,
        error:null
      }
    case 'FETCH_LOADER_ON':
      return{
        ...state,
        loading: true
      }
    case 'FETCH_LOADER_OFF':
      return{
        ...state,
        loading: false
      }
    case 'FETCH_ALL_USERS_SUCCESS':
      return{
        ...state,
        users: action.payload,
        error: null
      }
    case 'FETCH_USER_SUCCESS':
      return{
        ...state,
        user: action.payload,
        error: null,
      }
    case 'FETCH_USER_ERROR':
      return{
        ...state,
        user: [],
        error: action.payload,
      }
    case 'FETCH_USER_REQUEST':
      return{
        ...state,
        user: [],
        error: null,
      }
  }
}

export default reducer