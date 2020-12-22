import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_PRESCRIPTIONS,
  GET_MEDS,
  GET_TESTS,
  SAVE_PRES
} from "../actions/types";
const initialState = {
  profile: null,
  prescriptions: [],
  loading: false,
  meds: [],
  tests: [],
  pressaved: false
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
    case GET_MEDS:
      return {
        ...state,
        meds: action.payload
      };
    case SAVE_PRES:
      return {
        ...state,
        pressaved: action.payload
      };
    case GET_TESTS:
      return {
        ...state,
        tests: action.payload
      };
    case GET_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
