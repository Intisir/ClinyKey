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
  getAllTests,
  saveLabTests,
  sampleTaken
} from "../../actions/appointmentActions";

class SampleCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testsample: [],
      testList: [],
      totalCost: 0,
      after: 24
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  onSave(k) {
    console.log(k);

    this.props.sampleTaken(k);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getAllTests();
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appointment) {
      this.setState({
        testsample: nextProps.appointment.testsample
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
              <h3 className="page-title">Sample Collection</h3>
            </div>
          </div>

          {this.state.testsample.map((post, idx) => (
            <Row key={idx}>
              <Col>
                <Card small className="mb-4">
                  <CardHeader
                    className="border-bottom"
                    style={{ display: "grid", gridTemplateColumns: "80% 20%" }}
                  >
                    <div className="prescription-header">
                      <img className="rounded-circle" src={post.pic} alt="" />{" "}
                      <div>
                        <h6 className="text-danger font-weight-bold">
                          {post.name}
                        </h6>
                        <p className="pres-date">
                          {new Date(post.date).getDate() +
                            " " +
                            month[new Date(post.date).getMonth()] +
                            " " +
                            new Date(post.date).getFullYear()}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "grid", alignItems: "center" }}>
                      <button
                        type="button"
                        className="btn btn-accent"
                        onClick={() => this.onSave(post._id)}
                        style={{ width: "100%" }}
                      >
                        Save
                      </button>
                    </div>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <ul className="list-group list-group-flush">
                      {post.results && post.results.length > 0 ? (
                        post.results.map((m, l) => (
                          <li
                            className="list-group-item px-4"
                            key={l}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr"
                            }}
                          >
                            <span className="descriptionText">
                              {l + 1 + ".   " + m.name}
                            </span>
                            <span className="descriptionText">{m.id}</span>
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item px-4">
                          <span className="descriptionText">
                            {"No test given"}
                          </span>
                        </li>
                      )}
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ))}
        </Container>
      );
    }
    return doctorsLists;
  }
}

SampleCollection.propTypes = {
  getAllTests: PropTypes.func.isRequired,
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
  getAllTests,
  saveLabTests,
  sampleTaken
})(SampleCollection);
