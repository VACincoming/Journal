const initialState = {
  user: [],
  loading: true,
  error: null
}

const reducer = (state:any = initialState, action:any) => {
  switch(action.type){
    case 'FETCH_USER_SUCCESS':
      return{
        ...state,
        user: action.payload,
        error: null
      }
    case 'FETCH_USER_ERROR':
      return{
        ...state,
        user: [],
        error: action.payload
      }
    case 'FETCH_USER_REQUEST':
      return{
        ...state,
        user: [],
        error: null
      }
  }
}

export default reducer