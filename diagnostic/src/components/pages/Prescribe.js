import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getPatientProfile,
  getMedicinesSuggestion,
  getTestsSuggestion,
  savePrescription
} from "../../actions/profileAction";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import Checkboxes from "../common/Checkboxes";
import Spinner from "../common/Spinner";
import classnames from "classnames";

class Prescribe extends Component {
  constructor() {
    super();
    this.state = {
      medicinesList: [
        {
          name: "Napa",
          dose: "1+0+1",
          time: "After",
          instruction: "With Warm water",
          duration: 30
        }
      ],
      medname: "",
      dose: "1 + 1 + 1",
      time: "After",
      duration: 7,
      instruction: "",
      testList: [
        {
          name: "ABO Blood Group"
        }
      ],
      test: "",
      advice: "",
      adviceList: [{ name: "Drink Water" }],
      suggestions: []
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeMed = this.onChangeMed.bind(this);
    this.onChangeTest = this.onChangeTest.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddTest = this.onAddTest.bind(this);
    this.onAddAdvices = this.onAddAdvices.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  onChangeMed(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length !== 0 && e.target.value.length < 6) {
      this.props.getMedicinesSuggestion(e.target.value);
      this.setState({ suggestions: this.props.patientprofile.meds });
    } else {
      this.setState({ suggestions: [] });
    }
  }

  onChangeTest(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length !== 0 && e.target.value.length < 6) {
      this.props.getTestsSuggestion(e.target.value);
      this.setState({ suggestions: this.props.patientprofile.meds });
    } else {
      this.setState({ suggestions: [] });
    }
  }

  onSave(e) {
    e.preventDefault();

    const PrescriptionData = {
      cid: this.props.match.params.cid,
      pid: this.props.match.params.pid,
      medicineList: this.state.medicinesList,
      testList: this.state.testList,
      adviceList: this.state.adviceList
    };
    this.props.savePrescription(PrescriptionData);
  }

  onRemove(id) {
    let temp = [];
    temp = this.state.medicinesList;
    temp.splice(id, 1);
    this.setState({ medicinesList: temp });
  }
  onRemoveTest(id) {
    let temp = [];
    temp = this.state.testList;
    temp.splice(id, 1);
    this.setState({ testList: temp });
  }
  onRemoveAdvice(id) {
    let temp = [];
    temp = this.state.adviceList;
    temp.splice(id, 1);
    this.setState({ adviceList: temp });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.match.params.pid)
        this.props.getPatientProfile(this.props.match.params.pid);
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let temp = [];

    temp = this.state.medicinesList.slice();

    temp.push({
      name: this.state.name,
      dose: this.state.dose,
      time: this.state.time,
      duration: this.state.duration,
      instruction: this.state.instruction
    });

    this.setState({ medicinesList: temp });
  }
  onAddTest(e) {
    e.preventDefault();
    let temp = [];

    temp = this.state.testList.slice();

    temp.push({
      name: this.state.test
    });

    this.setState({ testList: temp });
  }
  onAddAdvices(e) {
    e.preventDefault();
    let temp = [];

    temp = this.state.adviceList.slice();

    temp.push({
      name: this.state.advice
    });

    this.setState({ adviceList: temp });
  }

  render() {
    let profileContents;
    let dose = [
      "1 + 1 + 1",
      "1 + 0 + 0",
      "0 + 1 + 0",
      "0 + 0 + 1",
      "1 + 0 + 1",
      "0 + 1 + 1",
      "1 + 1 + 0"
    ];
    let days = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      10,
      15,
      21,
      28,
      30,
      45,
      60,
      75,
      90,
      120,
      150,
      365
    ];

    if (
      this.props.patientprofile.profile === null ||
      this.props.patientprofile.loading
    ) {
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <Spinner />
        </div>
      );
    } else {
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Overview</span>
              <h3 className="page-title">Prescription</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="card card-small mb-4 pt-2">
                <div
                  className="m-3 text-center"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "15% 85%"
                  }}
                >
                  <div className="mx-auto" style={{ textAlign: "left" }}>
                    <img
                      className="rounded-circle"
                      src={this.props.patientprofile.profile[0].pic}
                      alt=""
                      width={"100%"}
                      style={{ objectFit: "cover" }}
                    />{" "}
                  </div>
                  <div style={{ textAlign: "left", marginLeft: "1rem" }}>
                    <span className="headingText">
                      {this.props.patientprofile.profile[0].name}
                    </span>
                    <span className="descriptionText d-block mb-0">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Phone :{" "}
                      </b>
                      {this.props.patientprofile.profile[0].phone}
                    </span>
                    <span className="descriptionText d-block mb-0">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Key :{" "}
                      </b>
                      {this.props.patientprofile.profile[0].key}
                    </span>
                    <span className="descriptionText d-block mb-0">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Height :{" "}
                      </b>
                      {this.props.patientprofile.profile[0].height}
                    </span>
                    <span className="descriptionText d-block mb-0">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Weight :{" "}
                      </b>
                      {this.props.patientprofile.profile[0].weight}
                    </span>
                    <div className="progress-wrapper mb-2">
                      <span className="d-block mb-2 descriptionText">
                        <b
                          className="descriptionText"
                          style={{ fontWeight: "600", color: "#000" }}
                        >
                          Health{" "}
                        </b>
                      </span>
                      <div className="progress progress-md">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          aria-valuenow={74}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{
                            width: 7 * 10 + "%"
                          }}
                        >
                          <span className="progress-value text-dark">
                            {7 * 10 + "%"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card card-small mb-4 pt-1">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item pt-2 pb-2 px-4">
                    <span className="descriptionText">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Age :{" "}
                      </b>
                      {this.props.patientprofile.profile[0].age}
                    </span>
                  </li>{" "}
                  <li className="list-group-item pt-2 pb-2 px-4">
                    <span className="descriptionText">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Blood Group :{" "}
                      </b>
                      {this.props.patientprofile.profile[0].bloodGroup}
                    </span>
                  </li>{" "}
                  <li className="list-group-item pt-2 pb-2 px-4">
                    <span className="descriptionText">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Diabetic{"   "}
                      </b>
                      {this.props.patientprofile.profile[0].diabetic ? (
                        <i
                          className="fas fa-circle"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            paddingLeft: "16px"
                          }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-circle"
                          style={{
                            color: "green",
                            fontSize: "12px",
                            paddingLeft: "16px"
                          }}
                        ></i>
                      )}
                    </span>
                  </li>{" "}
                  <li className="list-group-item pt-2 pb-2 px-4">
                    <span className="descriptionText">
                      <b
                        className="descriptionText"
                        style={{ fontWeight: "600", color: "#000" }}
                      >
                        Smoker{"   "}
                      </b>
                      {this.props.patientprofile.profile[0].smoker ? (
                        <i
                          className="fas fa-circle"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            paddingLeft: "18px"
                          }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-circle"
                          style={{
                            color: "green",
                            fontSize: "12px",
                            paddingLeft: "18px"
                          }}
                        ></i>
                      )}
                    </span>
                  </li>{" "}
                  <li className="list-group-item pt-2 pb-2 px-4">
                    {this.props.patientprofile.profile[0].hypertension ? (
                      <span className="descriptionText">
                        <b
                          className="descriptionText"
                          style={{ fontWeight: "600", color: "#000" }}
                        >
                          Hypertension{"   "}
                        </b>
                        <i
                          className="fas fa-circle"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            paddingLeft: "16px",
                            marginRight: "16px"
                          }}
                        ></i>
                      </span>
                    ) : (
                      ""
                    )}
                    {this.props.patientprofile.profile[0].hypotension ? (
                      <span className="descriptionText">
                        <b
                          className="descriptionText"
                          style={{ fontWeight: "600", color: "#000" }}
                        >
                          Hypotension{"   "}
                        </b>
                        <i
                          className="fas fa-circle"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            paddingLeft: "16px"
                          }}
                        ></i>
                      </span>
                    ) : (
                      <span className="descriptionText">
                        <b
                          className="descriptionText"
                          style={{ fontWeight: "600", color: "#000" }}
                        >
                          Hypotension{"   "}
                        </b>
                        <i
                          className="fas fa-circle"
                          style={{
                            color: "Green",
                            fontSize: "12px",
                            paddingLeft: "16px"
                          }}
                        ></i>
                      </span>
                    )}
                  </li>{" "}
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="row">
                <div className="col-12">
                  <div className="card card-small p-4">
                    <form autoComplete="off">
                      <div className="form-row">
                        <div className="form-group col-md-8 mb-2">
                          <label htmlFor="Medicine" className="d-block">
                            Medicine
                          </label>
                          <input
                            id="feName"
                            label="Medicine name"
                            type="text"
                            name="name"
                            list="medicines"
                            placeholder="Med"
                            className="form-control form-group"
                            onChange={this.onChangeMed}
                            defaultValue={this.state.medname}
                            style={{ paddingLeft: ".875rem" }}
                          />
                          <datalist id="medicines">
                            {this.props.patientprofile.meds.map((med, id) => (
                              <option
                                className="list-group-item"
                                value={med.name}
                                key={id}
                              ></option>
                            ))}
                          </datalist>
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="feInputCity">Days</label>
                          <select
                            id="feInputCity"
                            defaultValue={7}
                            className="form-control"
                            name="duration"
                            onChange={this.onChange}
                          >
                            {days.map(function(name, index) {
                              return <option key={index}>{name}</option>;
                            })}
                          </select>
                        </div>
                        <div className="form-group col-md-8">
                          <input
                            id="feName"
                            label="Dosage"
                            type="text"
                            name="dose"
                            list="dosesList"
                            placeholder="Dosage Ex. 1 + 1 + 1"
                            className="form-control form-group"
                            onChange={this.onChange}
                            defaultValue={this.state.dose}
                            style={{ paddingLeft: ".875rem" }}
                          />
                          <datalist id="dosesList">
                            {dose.map((dos, id) => (
                              <option
                                className="list-group-item"
                                value={dos}
                                key={id}
                              ></option>
                            ))}
                          </datalist>
                        </div>
                        <div className="form-group col-md-4">
                          <select
                            id="feInputState"
                            defaultValue={"After"}
                            className="form-control"
                            name="time"
                            onChange={this.onChange}
                          >
                            <option>After</option>
                            <option>Before</option>
                          </select>
                        </div>
                        <div className="form-group col-md-8">
                          <input
                            id="feName"
                            label="Instruction"
                            type="text"
                            name="instruction"
                            placeholder="Instruction"
                            className="form-control"
                            onChange={this.onChange}
                            defaultValue={this.state.instruction}
                            style={{ paddingLeft: ".875rem" }}
                          />
                        </div>
                        <div className="col-md-4">
                          <button
                            noValidate
                            style={{ width: "100%" }}
                            className="btn btn-accent"
                            onClick={this.onSubmit}
                          >
                            Add Medicine
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="card card-small p-4">
                    <form autoComplete="off">
                      <div className="form-row">
                        <div className="form-group col-md-8">
                          <input
                            id="feName"
                            label="Tests"
                            type="text"
                            name="test"
                            list="testList"
                            placeholder="Lab test"
                            className="form-control"
                            onChange={this.onChangeTest}
                            defaultValue={this.state.test}
                            style={{ paddingLeft: ".875rem" }}
                          />
                          <datalist id="testList">
                            {this.props.patientprofile.tests.map((med, id) => (
                              <option
                                className="list-group-item"
                                value={med.name}
                                key={id}
                              ></option>
                            ))}
                          </datalist>
                        </div>
                        <div className="form-group col-md-4 mb-0">
                          <button
                            noValidate
                            style={{ width: "100%" }}
                            className="btn btn-accent"
                            onClick={this.onAddTest}
                          >
                            Add Tests
                          </button>
                        </div>
                      </div>
                    </form>
                    <form autoComplete="off">
                      <div className="form-row">
                        <div className="form-group col-md-8 mb-0">
                          <input
                            id="feName"
                            label="Tests"
                            type="text"
                            name="advice"
                            list="adviceList"
                            placeholder="Advices"
                            className="form-control"
                            onChange={this.onChange}
                            defaultValue={this.state.advices}
                            style={{ paddingLeft: ".875rem" }}
                          />
                          <datalist id="adviceList">
                            {this.props.patientprofile.tests.map((med, id) => (
                              <option
                                className="list-group-item"
                                value={med.name}
                                key={id}
                              ></option>
                            ))}
                          </datalist>
                        </div>
                        <div className="form-group col-md-4 mb-0">
                          <button
                            noValidate
                            style={{ width: "100%" }}
                            className="btn btn-accent"
                            onClick={this.onAddAdvices}
                          >
                            Add Advices
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="row">
                {this.state.medicinesList.length !== 0 ? (
                  <div className="col-lg-12">
                    <div className="card card-small mb-4 pt-1">
                      <div className="card-header border-bottom">
                        <span>Medicine List</span>
                      </div>
                      <ul className="list-group list-group-flush">
                        {this.state.medicinesList.map((med, id) => (
                          <li
                            className="list-group-item pt-2 pb-2 px-4"
                            key={id}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "95% 5%",
                              alignItems: "center"
                            }}
                          >
                            <div>
                              <span className="descriptionText pl-1">
                                <b
                                  className="descriptionText"
                                  style={{ fontWeight: "600", color: "#000" }}
                                >
                                  {id + 1 + ".  " + med.name}
                                </b>
                              </span>
                              <span className="descriptionText pl-3">
                                {med.dose}
                              </span>
                              <span className="descriptionText pl-3">
                                {med.time}
                              </span>
                              <span className="descriptionText pl-3">
                                {med.duration + " days"}
                              </span>
                              <span className="descriptionText pl-3">
                                {med.instruction}
                              </span>
                            </div>

                            <i
                              className="fas fa-times-circle ml-3"
                              style={{ fontSize: "14px" }}
                              onClick={this.onRemove.bind(this, id)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {this.state.testList.length !== 0 ? (
                  <div className="col-lg-12 mb-0">
                    <div className="card card-small mb-4 pt-1">
                      <div className="card-header border-bottom">
                        <span>Tests List</span>
                      </div>
                      <ul className="list-group list-group-flush">
                        {this.state.testList.map((med, id) => (
                          <li
                            className="list-group-item pt-2 pb-2 px-4"
                            key={id}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "95% 5%",
                              alignItems: "center"
                            }}
                          >
                            <div>
                              <span className="descriptionText pl-1">
                                <b
                                  className="descriptionText"
                                  style={{ fontWeight: "600", color: "#000" }}
                                >
                                  {id + 1 + ".  " + med.name}
                                </b>
                              </span>
                            </div>

                            <i
                              className="fas fa-times-circle ml-3"
                              style={{ fontSize: "14px" }}
                              onClick={this.onRemoveTest.bind(this, id)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {this.state.adviceList.length !== 0 ? (
                  <div className="col-lg-12 mb-0">
                    <div className="card card-small mb-4 pt-1">
                      <div className="card-header border-bottom">
                        <span>Advice List</span>
                      </div>
                      <ul className="list-group list-group-flush">
                        {this.state.adviceList.map((med, id) => (
                          <li
                            className="list-group-item pt-2 pb-2 px-4"
                            key={id}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "95% 5%",
                              alignItems: "center"
                            }}
                          >
                            <div>
                              <span className="descriptionText pl-1">
                                <b
                                  className="descriptionText"
                                  style={{ fontWeight: "600", color: "#000" }}
                                >
                                  {id + 1 + ".  " + med.name}
                                </b>
                              </span>
                            </div>

                            <i
                              className="fas fa-times-circle ml-3"
                              style={{ fontSize: "14px" }}
                              onClick={this.onRemoveAdvice.bind(this, id)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {this.state.medicinesList.length !== 0 ||
                this.state.testList.length !== 0 ||
                this.state.adviceList.length !== 0 ? (
                  <div className="col-lg-12 mb-4">
                    <button
                      noValidate
                      style={{ width: "100%" }}
                      className="btn btn-accent"
                      onClick={this.onSave}
                    >
                      Save Prescription
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return profileContents;
  }
}

Prescribe.propTypes = {
  getPatientProfile: PropTypes.func.isRequired,
  getMedicinesSuggestion: PropTypes.func.isRequired,
  getTestsSuggestion: PropTypes.func.isRequired,
  savePrescription: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  patientprofile: state.patientprofile
});

export default connect(
  mapStateToProps,
  {
    getPatientProfile,
    getMedicinesSuggestion,
    getTestsSuggestion,
    savePrescription
  }
)(withRouter(Prescribe));
