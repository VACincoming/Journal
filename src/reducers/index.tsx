const initialState = {
  user: [],
  users: [],
  loading: true,
  error: null,
  schedule: [],
  scheduleTime: []
}

const reducer = (state:any = initialState, action:any) => {
  switch(action.type){
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