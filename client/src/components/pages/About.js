import React from 'react';
import cover from '../../images/banner/breadcump-img.png';
import pc from '../../images/banner/pc.png';
import checkicon from '../../images/all-img/check-icon.png';

const About = (props) => {
  return (
    <React.Fragment>
      <div className='rt-breadcump rt-breadcump-height breaducump-style-2'>
        <div
          className='rt-page-bg rtbgprefix-full'
          style={{ backgroundImage: `url(${cover})` }}
        ></div>
        {/* /.rt-page-bg */}
        <div className='container'>
          <div className='row rt-breadcump-height align-items-center'>
            <div className='col-lg-12 mx-auto text-center text-white'>
              <h4 className='f-size-70 f-size-lg-50 f-size-md-40 f-size-xs-24 rt-strong'>
                About Us
              </h4>
              <h4 className='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3'>
                Bid-It is the world's best marketplace for buying and selling
                products
              </h4>
            </div>
            {/* /.col-12 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </div>

      <section className='page-content-area bg-elements-parent'>
        <div
          className='rt-bg-elemtnts shape-right-4 rtbgprefix-contain'
          style={{ backgroundImage: `url(${pc})` }}
        ></div>
        {/* /.rt-bg-elemtnts */}
        <div className='container'>
          <div className='row'>
            <div className='col-xl-8 col-lg-10'>
              <h2 className='rt-section-title'>About Bid-It</h2>
              <p className='rt-light3 f-size-18 line-height-34'>
                Welcome to the world's leading platform for buyers and
                sellers.Bid-It is the world’s free online marketplace, more than
                7 million products available for sale and purchase, more than 10
                million product searches and for then 5 million Successful bids.
                Whether you are a product buyer or a seller, Bid-It is the most
                trusted name in Online trading.
              </p>
              <div className='rt-spacer-30'></div>
              {/* /.rt-spacer-60 */}
              <ul className='rt-list'>
                <li className='f-size-18 line-height-34 clearfix rt-mb-8'>
                  <img
                    src={checkicon}
                    alt='checkicon'
                    draggable='false'
                    className='rt-mr-5 '
                  />
                  19 million products for sale & purchase
                </li>
                <li className='f-size-18 line-height-34 clearfix rt-mb-8'>
                  <img
                    src={checkicon}
                    alt='checkicon'
                    draggable='false'
                    className='rt-mr-5 '
                  />
                  2 million customers worldwide
                </li>
                <li className='f-size-18 line-height-34 clearfix rt-mb-8'>
                  <img
                    src={checkicon}
                    alt='checkicon'
                    draggable='false'
                    className='rt-mr-5 '
                  />
                  Product Sellers can achieve average sale prices
                </li>
                <li className='f-size-18 line-height-34 clearfix rt-mb-8'>
                  <img
                    src={checkicon}
                    alt='checkicon'
                    draggable='false'
                    className='rt-mr-5 '
                  />
                  Product Buyers easily find high quality relevant products
                </li>
                <li className='f-size-18 line-height-34 clearfix rt-mb-8'>
                  <img
                    src={checkicon}
                    alt='checkicon'
                    draggable='false'
                    className='rt-mr-5 '
                  />
                  Earning money with selling products
                </li>
              </ul>
            </div>
            {/* /.col-lg-7 */}
          </div>
          {/* /.row */}
          <div className='rt-spacer-80'></div>
          {/* /.rt-spacer-60 */}
          <div className='row'>
            <div className='col-lg-4 col-md-6 mx-auto  rt-mb-30'>
              <div className='rt-single-icon-box  icon-center text-center rt-gradient-1 rt-rounded-10 rt-pt-20 rt-pb-20'>
                <div className='iconbox-content'>
                  <h5 className='f-size-36  rt-semiblod f-size-xs-28 rt-mb-0 text-white'>
                    7 Million
                  </h5>
                  <p className='f-size-18 line-height-34 rt-light3 rt-mb-0 text-white'>
                    Products for sale
                  </p>
                </div>
                {/* /.iconbox-content */}
              </div>
              {/* /.rt-single-icon-box wow fade-in-bottom */}
            </div>
            {/* /.col-lg-4 */}
            <div className='col-lg-4 col-md-6 mx-auto  rt-mb-30'>
              <div className='rt-single-icon-box  icon-center text-center rt-gradient-2 rt-rounded-10 rt-pt-20 rt-pb-20'>
                <div className='iconbox-content'>
                  <h5 className='f-size-36  rt-semiblod f-size-xs-28 rt-mb-0 text-white'>
                    2 Million
                  </h5>
                  <p className='f-size-18 line-height-34 rt-light3 rt-mb-0 text-white'>
                    Customers Worldwide
                  </p>
                </div>
                {/* /.iconbox-content */}
              </div>
              {/* /.rt-single-icon-box wow fade-in-bottom */}
            </div>
            {/* /.col-lg-4 */}
            <div className='col-lg-4 col-md-6 mx-auto  rt-mb-30'>
              <div className='rt-single-icon-box  icon-center text-center rt-gradient-3 rt-rounded-10 rt-pt-20 rt-pb-20'>
                <div className='iconbox-content'>
                  <h5 className='f-size-36  rt-semiblod f-size-xs-28 rt-mb-0 text-white'>
                    5 Million
                  </h5>
                  <p className='f-size-18 line-height-34 rt-light3 rt-mb-0 text-white'>
                    Successful bids
                  </p>
                </div>
                {/* /.iconbox-content */}
              </div>
              {/* /.rt-single-icon-box wow fade-in-bottom */}
            </div>
            {/* /.col-lg-4 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </section>
    </React.Fragment>
  );
};

export default About;
