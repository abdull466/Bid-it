import React from "react";
import { Carousel, CarouselItem } from 'react-bootstrap'
import {
  deleteAd,
  getAd,
  approveBid,
  revertBid,
  closeAd,
} from "../../actions/adactions";
import { connect } from "react-redux";
import ReactStars from 'react-stars';
import "./style.css";

const Ad = ({ ad, deleteAd, getAd, approveBid, revertBid, closeAd }) => {
  const {
    _id,
    title,
    minbid,
    address,
    description,
    start,
    end,
    bids,
    status,
    closebid,
    image,
  } = ad;

  const approve = (id, bidid, user, price) => {
    console.log(user);
    approveBid(id, bidid, user, price);
  };



  const revert = (id, bidid, user, price) => {
    console.log(user);
    revertBid(id, bidid, user, price);
  };
  const toggleView = (_id) => {
    var element = document.getElementById(`${_id}`);
    if (element.style.display === "none") {
      element.style.display = "block";
      document.getElementById(`btn_${_id}`).innerText = "Hide Bids";
    } else {
      element.style.display = "none";
      document.getElementById(`btn_${_id}`).innerText = "View Bids";
    }
    // document.getElementById(`${_id}`).style.display='block'
  };

  return (
    <div className="card bg-light">
      <div className="icon-thumb">
        <Carousel>
          {image.map((e) => {

            return (
              <Carousel.Item>

                <img
                  className="d-block w-100"
                  src={e}
                  alt="box-icon"
                  style={{ width: "200px", height: "200px" }}
                  draggable="false"
                />

              </Carousel.Item>
            )
          })
          }
        </Carousel>
        {
          ad.auth_status === "BLOCKED" ?
            (

              <div>
                <h5 class='f-size-36 f-size-lg-28 rt-normal rt-mb-25'>
                  {ad.title}
                </h5>
                <h4 style={{ color: 'red' }}> ADD BLOCKED BY ADMIN </h4>
              </div>
            )
            :
            (
              <div>
                < p
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    marginRight: "5px",
                    marginTop: "3px",
                    padding: "4px",
                  }}
                >
                  <button className="rt-dark-btn:active" onClick={() => getAd(_id)}>
                    Edit
          </button>
                  {"      "}
                  <button className="rt-primary" onClick={() => deleteAd(_id)}>
                    Delete
          </button>
                  {"      "}

                  {!status && (
                    <button className="rt-light" onClick={() => closeAd(_id, closebid)}>
                      {closebid ? "Open Ad" : "Close Ad"}
                    </button>
                  )}
                </p>

                <code style={{ position: "absolute", top: "50px", right: "10px" }}>
                  {status || closebid ? (
                    <p> Bid has been closed </p>
                  ) : (
                      <p>
                        {" "}
                        Available from {start} to {end}{" "}
                      </p>
                    )}
                </code>

                <form
                  style={{ width: "200px", display: "inline" }}
                  className="rt-form rt-line-form"
                >
                  <input type="text" readOnly value={title} />
                  <input type="text" readOnly value={description} />

                  <input
                    type="text"
                    readOnly
                    value={`Minimum Bid Price  : ${minbid}`}
                  />
                  <input type="text" readOnly value={address} />
                </form>


                <div>


                  {closebid === false && (
                    <div>
                      <button
                        className="rt-secondary"
                        id={`btn_${_id}`}
                        onClick={() => toggleView(_id)}
                      >
                        View Bids
        </button>

                      <table id={`${_id}`} style={{ display: "none" }}>
                        <tr>
                          <th> Customer Name </th>
                          <th>Price </th>
                          <th>Rating </th>
                          <th> Approve </th>
                        </tr>
                        {bids.length === 0 ? (
                          <div>No Bids on this add</div>
                        ) : (
                            bids.map((bid) => (
                              <tr>
                                <td>{bid.firstname}</td>

                                <td>{bid.price}</td>
                                <td>

                                  <ReactStars
                                    edit={false}
                                    count={5}
                                    value={bid.userRating}
                                    size={24}
                                    color2={'#ffd700'}
                                  />

                                </td>
                                {bid.status ? (
                                  <td>
                                    <button
                                      onClick={() =>
                                        revert(_id, bid._id, bid.user, bid.price)
                                      }
                                    >
                                      Revert
                      </button>
                                  </td>
                                ) : (
                                    <td>
                                      <button

                                        onClick={() =>
                                          approve(_id, bid._id, bid.user, bid.price)
                                        }
                                      >
                                        Approve
                      </button>
                                    </td>
                                  )}
                              </tr>
                            ))
                          )}
                      </table>
                    </div>
                  )}


                </div>
              </div>
            )}
      </div >
    </div>
  );
};
export default connect(null, {
  deleteAd,
  getAd,
  approveBid,
  revertBid,
  closeAd,
})(Ad);
