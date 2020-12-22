import React from "react";
import {
  Container,
  CardBody,
  Row,
  Col,
  Card,
  Badge,
  CardHeader
} from "shards-react";
import TextFieldGroup from "../common/TextFieldGroup";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import {
  getTestResultByID,
  saveLabTests,
  sampleTaken,
  publishReport
} from "../../actions/appointmentActions";

class AddResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testsample: [],
      testList: [],
      totalCost: 0,
      parameter: "",
      result: "",
      range: "",
      after: 24,
      testselected: null
    };

    this.onChange = this.onChange.bind(this);
    this.addRes = this.addRes.bind(this);
    this.publish = this.publish.bind(this);
    //this.onSave = this.onSave.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  publish() {
    let allRes = false;

    this.state.testsample.results.map((l, o) => {
      if (l.result.length > 0) {
        allRes = true;
      } else {
        allRes = false;
      }
    });

    if (allRes) {
      this.props.publishReport(this.state.testsample, this.props.history);
    }
  }

  addRes(k) {
    let index;

    if (this.state.testselected === null) {
      index = 0;
    } else {
      index = this.state.testsample.results.findIndex(
        x => x.name === this.state.testselected
      );
    }

    let obj = {
      name: this.state.parameter,
      result: this.state.result,
      nrange: this.state.range
    };

    if (
      this.state.parameter !== "" &&
      this.state.result !== "" &&
      this.state.range !== ""
    ) {
      this.state.testsample.results[index].result.push(obj);
    }

    this.setState({ testsample: this.state.testsample });
  }

  componentDidMount() {
    console.log("XX");
    if (this.props.auth.isAuthenticated) {
      if (this.props.match.params.resid) {
        this.props.getTestResultByID(this.props.match.params.resid);
      }
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appointment) {
      this.setState({
        testsample: nextProps.appointment.testresult
      });
    } else {
      this.setState({
        testsample: []
      });
    }
  }

  render() {
    //const appointmentList = this.state.appointments;
    let doctorsLists;
    let totalapp = 0;

    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    console.log(this.state.testsample);

    doctorsLists = (
      <div className="main-content-container container-fluid px-4">
        <Spinner />
      </div>
    );

    if (
      this.state.testsample &&
      Object.keys(this.state.testsample).length > 0
    ) {
      doctorsLists = (
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Overview</span>
              <h3 className="page-title">Publish Result</h3>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-4">
              <select
                id="feInputCity"
                defaultValue={7}
                className="form-control"
                name="testselected"
                onChange={this.onChange}
              >
                {this.state.testsample.results.map(function(name, index) {
                  return <option key={index}>{name.name}</option>;
                })}
              </select>
            </div>
            <div className="form-group col-md-3">
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => this.publish()}
              >
                Publish
              </button>
            </div>
          </div>

          <div className="row mt-2">
            <div className="form-group col-md-4">
              <input
                id="parameter"
                label="Parameter"
                type="text"
                name="parameter"
                placeholder="Parameter"
                onChange={this.onChange}
                className="form-control"
                style={{ paddingLeft: ".875rem" }}
              />
            </div>
            <div className="form-group col-md-3">
              <input
                id="result"
                label="Result"
                type="text"
                name="result"
                placeholder="Result"
                onChange={this.onChange}
                className="form-control"
                style={{ paddingLeft: ".875rem" }}
              />
            </div>

            <div className="form-group col-md-3">
              <input
                id="range"
                label="Normal Range"
                type="text"
                name="range"
                placeholder="Normal Range"
                onChange={this.onChange}
                className="form-control"
                style={{ paddingLeft: ".875rem" }}
              />
            </div>
            <div className="form-group col-md-2">
              <button
                type="button"
                className="btn btn-accent"
                style={{ width: "100%" }}
                onClick={() => this.addRes(1)}
              >
                Add
              </button>
            </div>
          </div>

          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader>
                  {" "}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr",
                      fontSize: "16",
                      fontWeight: "bold"
                    }}
                  >
                    <span>Parameter</span>
                    <span>Result</span>
                    <span>Normal Range</span>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  {this.state.testsample.results.map((m, l) => (
                    <div>
                      <h6 className="mb-2">{m.name}</h6>
                      <ul className="list-group list-group-flush">
                        {m.result.length > 0
                          ? m.result.map((o, p) => (
                              <li className="list-group-item px-4">
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "2fr 1fr 1fr"
                                  }}
                                >
                                  <span>{o.name}</span>
                                  <span>{o.result}</span>
                                  <span>{o.nrange}</span>
                                </div>
                              </li>
                            ))
                          : ""}
                      </ul>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }
    return doctorsLists;
  }
}

AddResult.propTypes = {
  getTestResultByID: PropTypes.func.isRequired,
  publishReport: PropTypes.func.isRequired,
  saveLabTests: PropTypes.func.isRequired,
  sampleTaken: PropTypes.func.isRequired,
  docprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  docprofile: state.docprofile,
  appointment: state.appointment
});

export default connect(mapStateToProps, {
  getTestResultByID,
  publishReport,
  saveLabTests,
  sampleTaken
})(AddResult);
