import { RECEIVE_USER, REMOVE_USER} from "./user_reducer";

const sessionReducer = (state = {id: null}, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case RECEIVE_USER:
      return {id: action.user.id};
    case REMOVE_USER:
      return {id: null}
    default:
      return state;
  }
}

export default sessionReducer;