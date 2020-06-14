import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCurrentAd, addBid } from "../../actions/adactions";
import axios from 'axios'
import breadcump from "../../images/banner/breadcump-img.png";
import { Carousel } from 'react-bootstrap'

import swal from "sweetalert";
import Counter from "./counter";
import Alert from "../Layout/Alert";
import setAuthToken from "../../utils/setAuthToken";
let adData = "";
var imags = []
var bdl = ""
var id = window.location.href;
id = id.slice(27)
axios
  .post("/api/ads/myAd/", { params: id })
  .then(response => {
    adData = response.data.allResult;
    imags = response.data.allResult.image
    bdl = response.data.bidsL;
    console.log("error", adData);
  })
  .catch(error => {
    console.log("error", error);
  });

const Bid = (props) => {


  var { getCurrentAd, match, current_ad, addBid } = props;
  const [text, setBidPrice] = useState("");

  const onChange = (e) => {
    setBidPrice(e.target.value);
  };
  var isloaded = false;

  const adId = match.params.id;

  useEffect(() => {
    setAuthToken(localStorage.token);
    getCurrentAd(match.params.id);
  }, [getCurrentAd, match.params.id]);

  if (!localStorage.token) {
    window.location.href = "/";
  }
  const submitBid = (e) => {
    e.preventDefault();

    if (isNaN(text)) {
      swal({
        title: "Ooops!",
        text: "Please enter valid price in integer!",
        icon: "error",
      });
    } else if (parseInt(text) < parseInt(current_ad.minbid)) {
      swal({
        title: "Ooops!",
        text: "Price must be greater than minimum bid price!",
        icon: "error",
      });
    } else {

      addBid(adId, { text });
      setBidPrice("");
    }
  };


  // axios.get(`/api/ads/myAd/${match.params.id}`).then(function (response) {
  //   console.log(response.data.AdImage);
  // })




  return (
    <React.Fragment>
      <div className="rt-breadcump rt-breadcump-height breaducump-style-2">
        <div
          className="rt-page-bg rtbgprefix-full"
          style={{ backgroundImage: `url(${breadcump})` }}
        ></div>

        {/* /.rt-page-bg */}
        <div className="container">
          <div
            className="row rt-breadcump-height align-items-center"
            style={{ height: "300px" }}
          >
            <div className="col-lg-8 col-xl-7 mx-auto text-center text-white">
              <br />
            </div>
            {/* /.col-12 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h3> Product Details</h3>
            <hr />

            <div className="card" style={{ width: "38rem" }}>

              <Carousel>
                {imags.map((e) => {

                  return (
                    <Carousel.Item>

                      <img
                        className="d-block w-100"
                        src={`http://localhost:3000/ads/${e}`}
                        alt="box-icon"
                        style={{ width: "200px", height: "200px" }}
                        draggable="false"
                      />

                    </Carousel.Item>
                  )
                })
                }
              </Carousel>

              <div className="card-body">
                <h4 className="card-title">{adData.title}</h4>

                <p className="card-text">{adData.description}</p>
                {adData.status ? (
                  <p style={{ color: "lime" }}>Pending</p>
                ) : (
                    <p style={{ color: "red" }}>Completed</p>
                  )}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  {" "}
                  {adData.start} - {adData.end}
                </li>

                <li className="list-group-item">
                  Bid Starts from : {adData.minbid}
                </li>

                <li className="list-group-item">{adData.address}</li>
              </ul>
            </div>
          </div>
          <div className="col-sm">
            <h3> Bid On Product </h3>
            <hr />
            <form onSubmit={submitBid}>
              <input
                type="text"
                required
                name="text"
                value={text}
                onChange={(e) => setBidPrice(e.target.value)}
                placeholder="Enter price"
              />
              <input
                type="submit"
                value="Bid Price"
                style={{
                  backgroundColor: "#4CAF50" /* Green */,
                  border: "none",

                  color: "white",

                  margin: "0 auto",
                  textAlign: "center",
                  textDecoration: "none",

                  display: "inline-block",
                  fontSize: "16px",
                  margin: "4px 2px",
                  cursor: "pointer",
                }}
              />
            </form>
            <Alert />
            <hr />
            <Counter time={adData.end} />
          </div>
          <div className="col-sm">
            <h3> {bdl.length} Bids so far </h3>
            <hr />
            <div class="rt-price-1">
              <div class="price-body rt-pt-10">
                <ul class="rt-list">
                  {bdl.length === 0 ? (
                    <p>No Bids found so far</p>
                  ) : (
                      adData.bids.map((bid) => (
                        <li class="clearfix">
                          <a href="#">
                            {bid.firstname}
                            <span class="float-right">{bid.price}</span>
                          </a>
                        </li>
                      ))
                    )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapper = (state) => ({
  current_ad: state.ad.current_ad,
});
export default connect(mapper, { getCurrentAd, addBid })(Bid);
