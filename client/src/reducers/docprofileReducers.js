import {
  GET_DOCTORS_PROFILES,
  PROFILE_LOADING,
  GET_DONOR_PROFILES
} from "../actions/types";
const initialState = {
  loading: false,
  profiles: null,
  donors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_DOCTORS_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case GET_DONOR_PROFILES:
      return {
        ...state,
        donors: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
