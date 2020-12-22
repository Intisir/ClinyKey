import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_DOCTORS_PROFILES,
  GET_PRESCRIPTIONS,
  GET_DONOR_PROFILES,
  GET_TEST_RESULTS
} from "./types";

export const updateUserProfile = userData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/patient/profile/update", userData)
    .then(res => dispatch(setProfile(res.data)))
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const createUserProfile = (userData, history) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/patient/profile/create", userData)
    .then(res => {
      dispatch(setProfile(res.data));
      history.push("/profile");
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getCurrentProfile = (history, location) => dispatch => {
  dispatch(setProfileLoading());
  axios.get("/api/patient/profile").then(res => {
    if (Object.keys(res.data).length > 0) {
      localStorage.setItem("myprofile", JSON.stringify(res.data));
      dispatch(setProfile(res.data));
    } else {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
      history.push("/createprofile");
    }
  });
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/doctor/profile/all")
    .then(res =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: null
      })
    );
};

export const getPrescriptions = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/prescription")
    .then(res =>
      dispatch({
        type: GET_PRESCRIPTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRESCRIPTIONS,
        payload: null
      })
    );
};

export const getTestResults = presid => dispatch => {
  console.log("XMAH");

  axios
    .post("/api/prescription/testresultbyid", { presid })
    .then(res =>
      dispatch({
        type: GET_TEST_RESULTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TEST_RESULTS,
        payload: []
      })
    );
};

export const getProfilesBySearch = sarchkey => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/doctor/profile/all/${sarchkey}`)
    .then(res =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: null
      })
    );
};

export const getProfileByOid = oid => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/doctor/profile/${oid}`)
    .then(res =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: null
      })
    );
};

export const getDonorProfiles = oid => dispatch => {
  dispatch(setProfileLoading());
  console.log(oid);
  axios
    .post("/api/patient/blood", { oid: oid.toUpperCase() })
    .then(res => {
      console.log(res.data);

      dispatch({
        type: GET_DONOR_PROFILES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_DONOR_PROFILES,
        payload: null
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const setProfile = data => {
  return {
    type: GET_PROFILE,
    payload: data
  };
};
