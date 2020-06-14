import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCurrentAd, addBid } from "../../actions/adactions";

import { getProfileById } from '../../actions/profile'

import breadcump from "../../images/banner/breadcump-img.png";


import Alert from "../Layout/Alert";
import setAuthToken from "../../utils/setAuthToken";

const ProfileUser = (props) => {
  const { match, getProfileById, profile } = props;

  useEffect(() => {
    setAuthToken(localStorage.token);
    getProfileById(match.params.id);
  }, [match.params.id]);

  if (!localStorage.token) {
    window.location.href = "/";
  }

  // const submitBid = (e) => {
  //   e.preventDefault();

  //   if (isNaN(text)) {
  //     swal({
  //       title: "Ooops!",
  //       text: "Please enter valid price in integer!",
  //       icon: "error",
  //     });
  //   } else if (parseInt(text) < parseInt(current_ad.minbid)) {
  //     swal({
  //       title: "Ooops!",
  //       text: "Price must be greater than minimum bid price!",
  //       icon: "error",
  //     });
  //   } else {

  //     addBid(adId, { text });
  //     setBidPrice("");
  //   }
  // };

  return (
    <React.Fragment>
      <div className="rt-breadcump rt-breadcump-height breaducump-style-2">
        <div
          className="rt-page-bg rtbgprefix-full"
          style={{ backgroundImage: `url(${breadcump})` }}
        ></div>
        <div className="container">
          <div
            className="row rt-breadcump-height align-items-center"
            style={{ height: "300px" }}
          >
            <div className="col-lg-8 col-xl-7 mx-auto text-center text-white">
              <br />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {!!profile ? <div className='row'>
          <div className="col-sm ">
            <div>
              <img src={`/uploads/${profile.image}`} alt="image" />
            </div>
          </div>
          <div className="col-sm h4">
            <table>
              <tr>
                <td>First Name:</td>
                <td>{profile.fname}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{profile.lname}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{profile.email}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{profile.country}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{profile.city}</td>
              </tr>
            </table>
          </div>
        </div> : <h3>Loading...</h3>}
      </div>
    </React.Fragment>
  );
};

const mapper = (state) => ({
  profile: state.profile.profile
});
export default connect(mapper, { getProfileById })(ProfileUser);
