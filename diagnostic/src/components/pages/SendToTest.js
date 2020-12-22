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
  getPrescriptionByID,
  saveLabTests
} from "../../actions/appointmentActions";

class SendToTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pres: null,
      testList: [],
      totalCost: 0,
      after: 24
    };

    this.addTest = this.addTest.bind(this);
    this.removeTest = this.removeTest.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  onSave() {
    const data = {
      presid: this.props.match.params.presid
        ? this.props.match.params.presid
        : "",
      pid: this.state.pres[0].pid,
      did: this.state.pres[0].did,
      digid: this.props.auth.isAuthenticated ? this.props.auth.user.oid : "",
      after: this.state.after,
      results: this.state.testList
    };

    this.props.saveLabTests(data, this.props.history);

    console.log(data);
  }

  addTest(k) {
    let array = this.state.testList;

    const test = {
      id: this.state.pres[0].tests[k]._id,
      name: this.state.pres[0].tests[k].name,
      price: this.state.pres[0].tests[k].price,
      result: []
    };

    array.push(test);

    let cost = 0;

    array.forEach((m, l) => {
      cost = cost + m.price;
    });

    this.setState({
      testList: array,
      totalCost: cost
    });

    console.log(this.state);
  }

  removeTest(k) {
    let array = this.state.testList;

    array.splice(k, 1);

    let cost = 0;

    array.forEach((m, l) => {
      cost = cost + m.price;
    });

    this.setState({
      testList: array,
      totalCost: cost
    });

    console.log(this.state);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.match.params.presid) {
        this.props.getPrescriptionByID(this.props.match.params.presid);
      }
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appointment) {
      this.setState({
        pres: nextProps.appointment.labtests
      });
    } else {
      this.setState({
        pres: []
      });
    }
  }

  render() {
    //const appointmentList = this.state.appointments;
    let doctorsLists;
    let totalapp = 0;

    doctorsLists = (
      <div className="main-content-container container-fluid px-4">
        <Spinner />
      </div>
    );

    if (this.state.pres && Object.keys(this.state.pres).length > 0) {
      doctorsLists = (
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Overview</span>
              <h3 className="page-title">Tests Customization</h3>
            </div>
          </div>
          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader
                  className="border-bottom"
                  style={{
                    display: "grid"
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 2fr 1fr 1fr",
                      color: "#7E2AC3",
                      fontWeight: "bold"
                    }}
                  >
                    <span>{"Test Name"}</span>
                    <span>{"Sample ID"}</span>
                    <span>{"Cost"}</span>
                    <span>{"Status"}</span>
                  </div>
                </CardHeader>
                <CardBody className="p-3">
                  {this.state.pres[0].tests.map((p, k) => (
                    <ul
                      className="list-group list-group-flush pt-2 pb-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 2fr 1fr 1fr"
                      }}
                    >
                      <span>{k + 1 + ".   " + p.name}</span>
                      <span>{p._id}</span>
                      <span>{p.price}</span>
                      <button
                        type="button"
                        className="btn btn-accent"
                        onClick={() => this.addTest(k)}
                      >
                        Add
                      </button>
                    </ul>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader
                  className="border-bottom"
                  style={{
                    display: "grid"
                  }}
                >
                  <div
                    style={{
                      color: "#7E2AC3",
                      fontWeight: "bold",
                      display: "grid",
                      gridTemplateColumns: "2fr 2fr 1fr 1fr"
                    }}
                  >
                    <span>
                      {"Selected Tests:  " + this.state.testList.length}
                    </span>
                    <span>{""}</span>
                    <span>{"Total:  " + this.state.totalCost + "Tk"}</span>
                  </div>
                </CardHeader>
                <CardBody className="p-3">
                  {this.state.testList.map((p, k) => (
                    <ul
                      className="list-group list-group-flush pt-2 pb-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 2fr 1fr 1fr"
                      }}
                    >
                      <span>{k + 1 + ".   " + p.name}</span>
                      <span>{p.id}</span>
                      <span>{p.price}</span>
                      <button
                        type="button"
                        className="btn btn-accent"
                        onClick={() => this.removeTest(k)}
                      >
                        Remove
                      </button>
                    </ul>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card small className="mb-4 pt-1 pb-1">
                <CardBody className="p-3">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "3fr 3fr 3fr 2fr",
                      alignItems: "center",
                      gap: "1rem"
                    }}
                  >
                    <div className="ml-3">
                      <select
                        id="feInputState"
                        defaultValue={"DEFAULT"}
                        className="form-control"
                        name="after"
                        onChange={this.onChange}
                      >
                        <option value="DEFAULT">{"Collect After"}</option>
                        <option>2</option>
                        <option>6</option>
                        <option>8</option>
                        <option>12</option>
                        <option>24</option>
                        <option>36</option>
                        <option>48</option>
                        <option>72</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      className="btn btn-accent"
                      onClick={this.onSave}
                    >
                      Save
                    </button>
                  </div>
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

SendToTest.propTypes = {
  getPrescriptionByID: PropTypes.func.isRequired,
  saveLabTests: PropTypes.func.isRequired,
  docprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  docprofile: state.docprofile,
  appointment: state.appointment
});

export default connect(mapStateToProps, { getPrescriptionByID, saveLabTests })(
  SendToTest
);
