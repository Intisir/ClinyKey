import React from "react";
import { Container, CardBody, Row, Col, Card, Badge } from "shards-react";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDonorProfiles } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

class FindDonor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null
    };
  }

  componentDidMount() {
    this.props.getDonorProfiles("");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.docprofile) {
      this.setState({
        profile: nextProps.docprofile.profiles
      });
    } else {
      this.setState({
        profile: null
      });
    }
  }

  render() {
    const profileList = this.props.docprofile.donors;
    let doctorsLists;

    if (profileList) {
      doctorsLists = (
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Profiles</span>
              <h3 className="page-title">Donors</h3>
            </div>
          </div>
          {/* Second Row of Posts */}
          <Row>
            {profileList.map((post, idx) => (
              <Col lg="4" sm="12" className="mb-4" key={idx}>
                <Card small className="card-post card-post--aside card-post--1">
                  <CardBody className="ml-2">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "20% 80%"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          display: "grid",
                          alignItems: "center"
                        }}
                      >
                        <div>
                          <img
                            className="rounded-circle docProfileImage"
                            src={post.picture}
                            alt=""
                          />
                        </div>
                      </div>
                      <div style={{ marginLeft: "1rem" }}>
                        <div>
                          <p className="card-text d-inline-block mb-1 headingText">
                            {post.name}
                          </p>
                        </div>
                        <div>
                          <p className="card-text d-inline-block mb-1 descriptionText">
                            {post.area}
                          </p>
                        </div>
                        <div>
                          <p
                            className="card-text d-inline-block mb-2 descriptionText"
                            style={{ color: "#b00" }}
                          >
                            {post.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      );
    } else {
      doctorsLists = (
        <div className="main-content-container container-fluid px-4">
          <Spinner />
        </div>
      );
    }

    return doctorsLists;
  }
}

FindDonor.propTypes = {
  getDonorProfiles: PropTypes.func.isRequired,
  docprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  docprofile: state.docprofile
});

export default connect(
  mapStateToProps,
  { getDonorProfiles }
)(FindDonor);
