import axios from "axios";
import {
  GET_APPOINTMENTS,
  SET_APPOINTMENT,
  SAVE_TEST_PRES,
  SAVE_TEST_COL,
  SAVE_TEST_COLLECTED,
  SAVE_TEST_RESULT
} from "./types";

export const setAppointment = (oid, cid) => dispatch => {
  axios
    .post(`/api/appointment/set/${oid}`, { cid })
    .then(res => dispatch(getAppointments(oid)))
    .catch(err =>
      dispatch({
        type: SET_APPOINTMENT,
        payload: []
      })
    );
};

export const getPrescriptionByID = presid => dispatch => {
  axios
    .post(`/api/prescription/byId`, { presid })
    .then(res =>
      dispatch({
        type: SAVE_TEST_PRES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SAVE_TEST_PRES,
        payload: []
      })
    );
};

export const getTestResultByID = resid => dispatch => {
  console.log(resid);

  axios
    .post(`/api/prescription/getTestResultByID`, { resid })
    .then(res =>
      dispatch({
        type: SAVE_TEST_RESULT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SAVE_TEST_RESULT,
        payload: []
      })
    );
};

export const publishReport = (data, history) => dispatch => {
  console.log(data);

  axios
    .post(`/api/prescription/publishReport`, { data })
    .then(res => {
      history.go(-1);
    })
    .catch(err => {});
};

export const getAllTestsCollected = () => dispatch => {
  console.log("axios");

  axios
    .get(`/api/prescription/gettestresultcollected`)
    .then(res => {
      console.log(res.data);

      dispatch({
        type: SAVE_TEST_COLLECTED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: SAVE_TEST_COLLECTED,
        payload: []
      })
    );
};

export const getAllTests = () => dispatch => {
  console.log("axios");

  axios
    .get(`/api/prescription/gettestresult`)
    .then(res => {
      console.log(res.data);

      dispatch({
        type: SAVE_TEST_COL,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: SAVE_TEST_COL,
        payload: []
      })
    );
};

export const sampleTaken = id => dispatch => {
  console.log("axios2");
  axios.post(`/api/prescription/samplecollected`, { id: id }).then(res => {
    console.log(res.data);
    dispatch(getAllTests());
  });
};

export const saveLabTests = (data, history) => () => {
  axios
    .post(`/api/prescription/saveTestResults`, { data })
    .then(res => {
      if (res.data) {
        history.go(-1);
        console.log(res.data);
      }
    })
    .catch(err => {});
};

export const getAppointments = oid => dispatch => {
  axios
    .get(`/api/appointment/${oid}`)
    .then(res =>
      dispatch({
        type: GET_APPOINTMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_APPOINTMENTS,
        payload: []
      })
    );
};

export const getAppointmentsByCid = cid => dispatch => {
  console.log(cid + "Ft");

  axios
    .get(`/api/appointment/chamber/${cid}`)
    .then(res =>
      dispatch({
        type: GET_APPOINTMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_APPOINTMENTS,
        payload: []
      })
    );
};
