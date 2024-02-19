// In reducers/authReducer.js

const initialState = {
    userData: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          userData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  