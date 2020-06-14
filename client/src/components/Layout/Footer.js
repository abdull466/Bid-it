import React from 'react';
import call from '../../images/all-img/call-bg.png';
import { Link } from 'react-router-dom';
const Footer = (props) => {
  return (
    <React.Fragment>
      <div class='rt-spacer-150  rt-spacer-xs-0'></div>
      {/* /.rt-spacer-244 */}
      {/* 
       !============= Footer Area Start ===========!
    */}
      <section class='rt-site-footer deafult-footer has-callto-action'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='footer-calltoaction rt-p-50 rt-rounded-10 rt-p-md-40 rt-p-xs-30 d-flex flex-lg-row flex-column align-items-center text-center text-lg-left justify-content-lg-between rtbgprefix-cover text-white justify-content-center'>
                <div className='left-column'>
                  <h4
                    className='wow fade-in-top f-size-50 f-size-lg-40 f-size-md-35 f-size-xs-24 rt-semibold rt-mb-15'
                    data-wow-duration='1s'
                    data-wow-delay='0.2s'
                  ></h4>
                  <p
                    className='wow fade-in-bottom f-size-xs-20 rt-light1 rt-mb-md-20 section-p-content'
                    data-wow-duration='1s'
                    data-wow-delay='0.2s'
                  ></p>
                </div>
                {/* /.left-column */}
              </div>
              {/* /.inner-content */}
            </div>
            {/* /.col-12 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}

        <div class='footer-top'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-3 col-md-6'>
                <div class='rt-single-widget wow fade-in-bottom'>
                  <Link to='/home' class='d-block rt-mb-25'>
                    <h2 style={{ color: 'grey' }}>Bid-It</h2>
                  </Link>

                  <p class='f-size-18 rt-light2 f-size-lg-18'>
                    World's best leading platform for buying and selling
                    products.
                  </p>

                  <ul class='rt-list rt-mt-35'>
                    <li class='d-inline-block'>
                      <Link
                        to='#'
                        class='rt-hw-50 text-center icon-white-secondary d-block rt-circle rt-mr-4'
                      >
                        <i class='fab fa-facebook-f' aria-hidden='true'></i>
                      </Link>
                    </li>
                    <li class='d-inline-block'>
                      <Link
                        to='#'
                        class='rt-hw-50 text-center icon-white-secondary d-block rt-circle rt-mr-4'
                      >
                        <i class='fab fa-twitter' aria-hidden='true'></i>
                      </Link>
                    </li>
                    <li class='d-inline-block'>
                      <Link
                        to='#'
                        class='rt-hw-50 text-center icon-white-secondary d-block rt-circle rt-mr-4'
                      >
                        <i class='fab fa-linkedin-in' aria-hidden='true'></i>
                      </Link>
                    </li>
                    <li class='d-inline-block'>
                      <Link
                        to='#'
                        class='rt-hw-50 text-center icon-white-secondary d-block rt-circle rt-mr-4'
                      >
                        <i class='fab fa-instagram' aria-hidden='true'></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* /.rt-single-widge */}
              </div>
              {/* /.col-lg-4 */}
              <div class='col-lg-3 col-md-6'>
                <div
                  class='rt-single-widget wow fade-in-bottom'
                  data-wow-duration='1s'
                  data-wow-delay='0.1s'
                >
                  <h3 class='rt-footer-title'>Our Information</h3>
                  <ul class='rt-usefulllinks2'>
                    <li>
                      <Link to='#'>
                        {' '}
                        <i class='icofont-thin-double-right'></i>About Us
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>Customer
                        Reviews
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>Business
                        License
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* /.rt-single-widget */}
              </div>
              {/* /.col-lg-4 */}
              <div class='col-lg-3 col-md-6'>
                <div
                  class='rt-single-widget wow fade-in-bottom'
                  data-wow-duration='1.3s'
                  data-wow-delay='0.3s'
                >
                  <h3 class='rt-footer-title'>My Account</h3>
                  <ul class='rt-usefulllinks2'>
                    <li>
                      <Link to='#'>
                        {' '}
                        <i class='icofont-thin-double-right'></i>Manage Accounts
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>How to Withdraw
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>Account
                        Varification
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>Safety &
                        Security
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>Membership
                        Level
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* /.rt-single-widget */}
              </div>
              {/* /.col-lg-4 */}
              <div class='col-lg-3 col-md-6'>
                <div
                  class='rt-single-widget wow fade-in-bottom'
                  data-wow-duration='1.6s'
                  data-wow-delay='0.6s'
                >
                  <h3 class='rt-footer-title'>help center</h3>
                  <ul class='rt-usefulllinks2'>
                    <li>
                      <Link to='#'>
                        {' '}
                        <i class='icofont-thin-double-right'></i>Help centre
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>FAQ
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>Quick Start
                        Guide
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>Tutorials
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <i class='icofont-thin-double-right'></i>Associate Blog
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* end single widget */}
              </div>
              {/* /.col-lg-4 */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container */}
        </div>
        {/* /.footer-top */}
        <div class='footer-bottom'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-12 text-center copy-right-text'>
                Copyright &copy; 2020.All Rights Reserved By{' '}
                <Link to='#' class='primary-color'>
                  {' '}
                  Bid-It
                </Link>
              </div>
              {/* /.col-lg-12 */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container */}
        </div>
        {/* /.footer-bottom */}
      </section>
    </React.Fragment>
  );
};
export default Footer;
