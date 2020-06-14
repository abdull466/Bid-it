import React, { useEffect } from "react";
import "../../custom.css";
import Slider from "../Layout/Slider";
import AdsForm from "../Ads/AdsForm";
import CustomAds from "../Ads/CustomAds";
 
import { connect } from "react-redux";
import breadcump from "../../images/banner/breadcump-img.png";
 
import {
  getAds,
  getAdsofLoginUser,
  getAllCatagories,
} from "../../actions/adactions";
const Ads = (props) => {
  const { ads, getAdsofLoginUser, catagories, getAllCatagories } = props;
  const ad = !ads;
  useEffect(() => {
    getAdsofLoginUser();
    getAllCatagories();
  }, [getAdsofLoginUser]);
  return (
    <div>
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
      <br />
      <br />

      <div className="grid-2">
        <div>
          <AdsForm catagories={catagories} />
        </div>

        <div>
          <CustomAds />
        </div>
      </div>
    </div>
  );
};

const mapper = (state) => ({
  ads: state.ad.ads,
  catagories: state.ad.catagories,
});
export default connect(mapper, { getAds, getAdsofLoginUser, getAllCatagories })(
  Ads
);
