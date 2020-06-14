import React from "react";
import section_bg1 from "../../images/all-img/section-bg-1.png";
import price_1 from "../../images/all-img/price-1.png";
import price_2 from "../../images/all-img/price-2.png";
import price_3 from "../../images/all-img/price-3.png";
const Stats = (props) => {
  return (
    <section
      class="price-area rtbgprefix-cover bg-elements-parent"
      style={{ backgroundImage: `url(${section_bg1})` }}
    >
      <div class="rt-spacer-200 rt-spacer-lg-100 rt-spacer-xs-50"></div>
      <div class="rt-bg-elemtnts rt-shape-ani-1">
        <div class="spin-container">
          <div class="shape">
            <div class="bd border_bg-1"></div>
          </div>
        </div>
      </div>
      <div class="rt-bg-elemtnts rt-shape-ani-2">
        <div class="spin-container">
          <div class="shape">
            <div class="bd border_bg-2"></div>
          </div>
        </div>
      </div>
      <div class="rt-bg-elemtnts rt-shape-ani-3">
        <div class="spin-container">
          <div class="shape">
            <div class="bd border_bg-3"></div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div
            class="col-xl-12 col-lg-8 mx-auto text-center wow fade-in-bottom"
            data-wow-duration="1s"
          >
            <h2 class="rt-section-title">Auction Market</h2>
            <p class="rt-mb-0 rt-light3 line-height-34 section-paragraph">
              Buy and sell house, car or anything. Find great and bid on it.
            </p>
          </div>
        </div>
        <div class="rt-spacer-60"></div>

        <div class="row">
          <div class="col-lg-4 col-md-6 mx-auto rt-mb-30 wow fade-in-bottom">
            <div class="rt-price-1">
              <div class="price-hrader text-center rt-mb-30">
                <img src={price_1} alt="price image" draggable="false" />
                <h3 class="f-size-36  f-size-xs-32 rt-normal">Auctions</h3>
                <p class="rt-light3 f-size-xs-22 section-p-content">
                  Auctions you can bid on
                </p>
              </div>
              <div class="price-body rt-pt-10">
                <ul class="rt-list">
                  <li class="clearfix">
                    <a href="#">
                      car 1<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix ">
                    <a href="#">
                      house 1<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      watch 1<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      bike 1<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      bedsheet 1<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      dinning table
                      <span class="float-right">$245.00</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="price-footer rt-mt-30 text-center">
                <a href="#">View More </a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mx-auto rt-mb-30 wow fade-in-bottom">
            <div class="rt-price-1">
              <div class="price-hrader text-center rt-mb-30">
                <img src={price_2} alt="price image" draggable="false" />
                <h3 class="f-size-36  f-size-xs-32 rt-normal">Car List</h3>
                <p class="rt-light3 f-size-xs-22 section-p-content">
                  Buy or sell old and new car
                </p>
              </div>
              <div class="price-body rt-pt-10">
                <ul class="rt-list">
                  <li class="clearfix">
                    <a href="#">
                      car 1<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix ">
                    <a href="#">
                      car 2<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      car 3<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      car 4<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      car 5<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      car 6<span class="float-right">$245.00</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="price-footer rt-mt-30 text-center">
                <a href="#">View More </a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mx-auto rt-mb-30 wow fade-in-bottom">
            <div class="rt-price-1">
              <div class="price-hrader text-center rt-mb-30">
                <img src={price_3} alt="price image" draggable="false" />
                <h3 class="f-size-36  f-size-xs-32 rt-normal">
                  Houses Auction
                </h3>
                <p class="rt-light3 f-size-xs-22 section-p-content">
                  Available Houses Buy or Sell
                </p>
              </div>
              <div class="price-body rt-pt-10">
                <ul class="rt-list">
                  <li class="clearfix">
                    <a href="#">
                      house 1<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix ">
                    <a href="#">
                      house 2<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      house 3<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      house 4<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      house 5<span class="float-right">$245.00</span>
                    </a>
                  </li>
                  <li class="clearfix">
                    <a href="#">
                      house 6<span class="float-right">$245.00</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="price-footer rt-mt-30 text-center">
                <a href="#">View More </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Stats;
