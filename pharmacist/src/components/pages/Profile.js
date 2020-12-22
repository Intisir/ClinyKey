import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  updateUserProfile,
  getProfileByOid
} from "../../actions/profileAction";
import { Link, withRouter } from "react-router-dom";
import { categories } from "../../utils/categories";
import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";
import classnames from "classnames";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      gender: "",
      category: "",
      specializations: "",
      education: "",
      designation: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getProfileByOid(
        this.props.auth.user.oid,
        this.props.history,
        this.props.location
      );
    } else if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/createprofile");
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      phone: this.state.phone,
      gender: this.state.gender,
      category: this.state.category,
      education: this.state.education,
      designation: this.state.designation,
      specializations: this.state.specializations
    };

    this.props.updateUserProfile(
      userData,
      this.props.history,
      this.props.location
    );
  }

  render() {
    console.log("A");

    const user = this.props.auth.user;
    let userImage;
    let profileContents;
    let myarea = "asdasd";
    if (this.state.area !== undefined) {
      myarea = this.state.area;
    }

    if (this.props.auth.isAuthenticated) {
      userImage = this.props.auth.user.picture;
    } else {
      userImage = require("../../images/user.png");
    }

    let { phone, key, gender, city, address } = "";

    if (
      this.props.docprofile.profiles === null ||
      Object.keys(this.props.docprofile.profiles).length === 0 ||
      this.props.docprofile.loading
    ) {
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <Spinner />
        </div>
      );
    } else {
      phone = this.props.docprofile.profiles[0].phone;
      gender = this.props.docprofile.profiles[0].gender;
      address = this.props.docprofile.profiles[0].address;
      profileContents = (
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle">Overview</span>
              <h3 className="page-title">Profile</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card card-small mb-4">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item p-3">
                    <div className="row">
                      <div className="col">
                        <form>
                          <div className="form-row">
                            <TextFieldGroup
                              placeholder="Name"
                              id="feName"
                              label="Name"
                              name="name"
                              divClass="form-group col-md-6"
                              labelHtmlFor="feFirstName"
                              defaultValue={user.name}
                              disabled="disabled"
                            />
                            <TextFieldGroup
                              placeholder="Email"
                              id="feEmail"
                              type="email"
                              name="email"
                              label="Email"
                              divClass="form-group col-md-6"
                              labelHtmlFor="feEmailAddress"
                              defaultValue={user.email}
                              disabled="disabled"
                            />
                          </div>
                          <div className="form-row">
                            <TextFieldGroup
                              placeholder="Example : 01614390717"
                              id="fePhone"
                              label="Phone"
                              name="phone"
                              defaultValue={phone}
                              divClass="form-group col-md-6"
                              labelHtmlFor="fePhone"
                              onChange={this.onChange}
                            />

                            <div className="form-group col-md-6">
                              <label htmlFor="feDescription">Address</label>
                              <input
                                type="text"
                                id="feInputDesignation"
                                className="form-control"
                                name="designation"
                                onChange={this.onChange}
                                defaultValue={address}
                                placeholder="Exp: House#321 Road 18"
                              />
                            </div>
                          </div>
                          <button
                            className="btn btn-accent"
                            noValidate
                            onClick={this.onSubmit}
                          >
                            Update Account
                          </button>
                        </form>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return profileContents;
  }
}

Profile.propTypes = {
  updateUserProfile: PropTypes.func.isRequired,
  getProfileByOid: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  userprofile: state.userprofile,
  docprofile: state.docprofile
});

export default connect(mapStateToProps, { updateUserProfile, getProfileByOid })(
  withRouter(Profile)
);
