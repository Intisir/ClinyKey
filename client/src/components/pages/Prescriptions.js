import React from "react";
import { Container, CardHeader, CardBody, Row, Col, Card } from "shards-react";
//import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPrescriptions } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
//import { Link } from "react-router-dom";
import { withRouter, Link } from "react-router-dom";

class Prescriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptions: null
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getPrescriptions();
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userprofile) {
      this.setState({
        prescriptions: nextProps.userprofile.prescriptions
      });
    } else {
      this.setState({
        prescriptions: null
      });
    }
  }

  render() {
    console.log("P");
    const prescriptions = this.props.userprofile.prescriptions;
    let presList;

    console.log(prescriptions);

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

    if (prescriptions) {
      presList = (
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Profiles</span>
              <h3 className="page-title">Prescriptions</h3>
            </div>
          </div>
          {/* Second Row of Posts */}

          {prescriptions.map((post, idx) => (
            <Row key={idx}>
              <Col>
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <div className="prescription-header">
                      <img className="rounded-circle" src={post.pic} alt="" />{" "}
                      <div>
                        <h6 className="text-danger font-weight-bold">
                          {post.name}
                        </h6>

                        {post.chambers.map((chamb, id) => {
                          if (post.cid === chamb.cid) {
                            chamber_name = chamb.name;
                            chamber_loc = chamb.area;
                          }
                          return "";
                        })}

                        <p>{chamber_name + " " + chamber_loc}</p>
                        <p className="pres-date">
                          {new Date(post.date).getDate() +
                            " " +
                            month[new Date(post.date).getMonth()] +
                            " " +
                            new Date(post.date).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <ul className="list-group list-group-flush">
                      {post.medicines.map((m, l) => (
                        <li className="list-group-item px-4 gridList" key={l}>
                          <span className="descriptionText">
                            {l + 1 + ".   " + m.name}
                          </span>
                          <span className="descriptionText">{m.dose}</span>
                          <span className="descriptionText">
                            {m.time + " Meal"}
                          </span>
                          <span className="descriptionText">
                            {m.duration + " Days"}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div
                      className="p-3 m-0"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem"
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <h6 className=" text-danger mb-0 font-weight-bold">
                            Given Tests
                          </h6>
                          <Link
                            className="ml-2"
                            to={`/testresults/${post._id}`}
                          >
                            <span style={{ fontSize: "12px" }}>
                              View Results
                            </span>
                          </Link>
                        </div>
                        <ul className="list-group list-group-flush">
                          {post.tests.length > 0 ? (
                            post.tests.map((q, w) => (
                              <li className="list-group-item px-2">
                                <span className="descriptionText">
                                  {w + 1 + ".   " + q.name}
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="list-group-item px-2">
                              <span className="descriptionText">No Tests</span>
                            </li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h6 className=" text-danger mb-0 font-weight-bold">
                          Advices
                        </h6>
                        <ul className="list-group list-group-flush">
                          {post.advices.length > 0 ? (
                            post.advices.map((q, w) => (
                              <li className="list-group-item px-2">
                                <span className="descriptionText">
                                  {w + 1 + ".   " + q.name}
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="list-group-item px-2">
                              <span className="descriptionText">
                                No Advices
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
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

Prescriptions.propTypes = {
  getPrescriptions: PropTypes.func.isRequired,
  userprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  userprofile: state.userprofile
});

export default connect(mapStateToProps, { getPrescriptions })(
  withRouter(Prescriptions)
);
