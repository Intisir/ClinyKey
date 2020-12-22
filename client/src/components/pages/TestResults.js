import React from "react";
import { Container, CardHeader, CardBody, Row, Col, Card } from "shards-react";
//import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPrescriptions, getTestResults } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
//import { Link } from "react-router-dom";
import { withRouter, Link } from "react-router-dom";

class TestResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptions: []
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.match.params.presid) {
        this.props.getTestResults(this.props.match.params.presid);
      }
      //this.props.getPrescriptions();
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userprofile) {
      this.setState({
        prescriptions: nextProps.userprofile.results
      });
    } else {
      this.setState({
        prescriptions: []
      });
    }
  }

  render() {
    let presList;
    //console.log(prescriptions);

    let chamber_name, chamber_loc;

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

    if (this.state.prescriptions && this.state.prescriptions.length > 0) {
      presList = (
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Report</span>
              <h3 className="page-title">Test Results</h3>
            </div>
          </div>
          {this.state.prescriptions.map((l, k) => (
            <Row key={k}>
              <Col>
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <p className="pres-date text-danger">
                      {new Date(l.date).getDate() +
                        " " +
                        month[new Date(l.date).getMonth()] +
                        " " +
                        new Date(l.date).getFullYear()}
                    </p>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <ul className="list-group list-group-flush">
                      <li
                        className="list-group-item px-4"
                        style={{
                          fontWeight: "bold",
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr"
                        }}
                      >
                        <span>Name</span>
                        <span>Parameters</span>
                        <span>Result</span>
                        <span>Normal Range</span>
                      </li>
                    </ul>
                    <ul className="list-group list-group-flush">
                      {l.results.map((n, p) => (
                        <div>
                          <li className="list-group-item px-4" key={l}>
                            <span className="descriptionText">
                              {p + 1 + ".   " + n.name}
                            </span>
                          </li>
                          {n.result.length > 0 ? (
                            n.result.map((q, e) => (
                              <li
                                className="list-group-item px-4 descriptionText"
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr 1fr 1fr"
                                }}
                              >
                                <span></span>
                                <span>{q.name}</span>
                                <span>{q.result}</span>
                                <span>{q.nrange}</span>
                              </li>
                            ))
                          ) : (
                            <li
                              className="list-group-item px-4 text-danger"
                              style={{
                                display: "grid",
                                fontWeight: "bold",
                                gridTemplateColumns: "1fr 1fr 1fr 1fr"
                              }}
                            >
                              <span>Report is not ready yet</span>
                            </li>
                          )}
                        </div>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ))}
        </Container>
      );
    } else {
      presList = (
        <div className="main-content-container container-fluid px-4">
          <Spinner />
        </div>
      );
    }

    return presList;
  }
}

TestResults.propTypes = {
  getPrescriptions: PropTypes.func.isRequired,
  getTestResults: PropTypes.func.isRequired,
  userprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  userprofile: state.userprofile
});

export default connect(mapStateToProps, { getPrescriptions, getTestResults })(
  withRouter(TestResults)
);
