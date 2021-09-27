import * as ActionTypes from '../actions/actions';

const initial_state = {
  user_id: null,

  name: null,
  role: null,
  auth_loading: false,
};

const reducer = (state = initial_state, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SESSION:
      return {
        role: payload.role,
        user_id: payload.id,
        name: payload.name,
        auth_loading: false
      };

      case ActionTypes.SET_LOADING:
      return {
        auth_loading : payload
      };

    case ActionTypes.RESET_SESSION:
      return {
        ...initial_state,
      };
    default:
      return state;
  }
};

export default reducer;
