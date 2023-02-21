export const INITIAL_STATE = {
  username: "",
  description: "",
  duration: 0,
  date: new Date(),
  users: [],
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "SET_DURATION":
      return {
        ...state,
        duration: Number(action.payload),
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      }
    case "SET_DATE":
      return {
        ...state,
        date: action.payload,
      }
    default:
      return state;
  }
};
