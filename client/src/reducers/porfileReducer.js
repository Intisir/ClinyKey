import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_PRESCRIPTIONS,
  GET_TEST_RESULTS
} from "../actions/types";
const initialState = {
  profile: null,
  prescriptions: null,
  loading: false,
  results: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: action.payload,
        loading: false
      };
    case GET_TEST_RESULTS:
      return {
        ...state,
        results: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
