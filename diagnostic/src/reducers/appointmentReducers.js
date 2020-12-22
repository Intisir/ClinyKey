import {
  GET_APPOINTMENTS,
  SET_APPOINTMENT,
  SAVE_TEST_PRES,
  SAVE_TEST_COL,
  SAVE_TEST_COLLECTED,
  SAVE_TEST_RESULT
} from "../actions/types";
const initialState = {
  appointments: null,
  myappointment: null,
  labtests: [],
  testsample: [],
  testscollected: [],
  testresult: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload
      };
    case SET_APPOINTMENT:
      return {
        ...state,
        myappointment: action.payload
      };
    case SAVE_TEST_PRES:
      return {
        ...state,
        labtests: action.payload
      };
    case SAVE_TEST_COL:
      return {
        ...state,
        testsample: action.payload
      };
    case SAVE_TEST_COLLECTED:
      return {
        ...state,
        testscollected: action.payload
      };
    case SAVE_TEST_RESULT:
      return {
        ...state,
        testresult: action.payload
      };
    default:
      return state;
  }
}
