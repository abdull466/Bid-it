import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../actions/auth';
import top2 from '../../images/all-img/top-2.png';
import top1 from '../../images/all-img/top-1.png';
import logo from '../../images/all-img/logo1.png';
import logo2 from '../../images/all-img/logo2.png';
import logo3 from '../../images/all-img/icon_6.png';


const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  title,
}) => {
  const guestLinks = (
    <React.Fragment>
      <li className='menu-item'>
        <Link to='/'>Home</Link>
      </li>

      <li className='menu-item'>
        <Link to='/about'>About</Link>
      </li>

      <li>
        {' '}
        <Link to='/contactus'>Contact Us</Link>
      </li>

      <li className='menu-item'>
        <Link to='/register'>register</Link>
      </li>
    </React.Fragment>
  );

  const authLinks = (
    <React.Fragment>
      {user && user.role === true ? (
        <React.Fragment>
          <li className='current-menu-item'>
            <Link to='/admin/catagories'>Catagories</Link>
          </li>
          <li className='menu-item'>
            <Link to='/admin/users'>Users</Link>
          </li>
          <li className='menu-item'>
            <Link to='/admin/postedads'>Posted Ads</Link>
          </li>
          <li className='menu-item'>
            <Link to='/admin/approvedbids'>Approved Bids</Link>
          </li>
        </React.Fragment>
      ) : (
          <React.Fragment>
            <li className='current-menu-item'>
              <Link to='/'>Home</Link>
            </li>
            <li className='menu-item'>
              <Link to='/auctions'>Auctions</Link>
            </li>
            <li className='menu-item'>
              <Link to='/ads'>Ads</Link>
            </li>
            <li className='menu-item'>
              <Link to='/approvedbids'>Approved Bids</Link>
            </li>
            <li className='menu-item'>
              <Link to='/adsfeedback'>Ads Feedback</Link>
            </li>
            <li className='menu-item'>
              <Link to='/myWallet'>Wallet</Link>
            </li>

            <li className='menu-item'>
              <Link to='/myChat' onClick={() => { localStorage.setItem('chat', 'initiated') }}>Chat</Link>
            </li>

            <li className='menu-item'>
              <Link to='/about'>About</Link>
            </li>
            <li>
              {' '}
              <Link to='/profile'>{user && user.fname}</Link>
            </li>
          </React.Fragment>
        )}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <header className='rt-site-header rt-fixed-top white-menu'>
        <div className='top-header'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-md-9'>
                <ul className='text-center text-md-left top-social'>
                  <li>
                    <span>
                      <Link to='#' className='f-size-14 text-white'>
                        <img src={top1} alt='' draggable='false' /> Support
                      </Link>
                    </span>
                  </li>
                  <li>
                    <select
                      className='rt-selectactive'
                      name='from'
                      style={{ width: '100%' }}
                    >
                      <option value='eng'>EN</option>
                      <option value='frc'>FR</option>
                      <option value='tur'>TR</option>
                    </select>
                    <span className='select-arrwo'>
                      <i className='icofont-thin-down'></i>
                    </span>
                  </li>

                  <li>
                    <Link to='#'>
                      <i className='icofont-facebook'></i>
                    </Link>
                  </li>
                  <li>
                    <Link to='#'>
                      <i className='icofont-twitter'></i>
                    </Link>
                  </li>
                  <li>
                    <Link to='#'>
                      <i className='icofont-google-plus'></i>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='col-md-3 text-center text-md-right'>
                <div className='rt-nav-tolls'>
                  <span className='d-md-inline d-none rt-mr-15 text-333'>
                    <Link to='login.html'>
                      <img src={top2} alt='' draggable='false' />
                    </Link>
                  </span>
                  <span className='d-md-inline d-none rt-mr-15 text-333 open-cart-opt'>
                    <Link to='#'>
                      <img
                        src='assets/images/all-img/top-3.png'
                        alt=''
                        draggable='false'
                      />
                    </Link>
                  </span>
                  <div className='rt-cart-box'>
                    <div className='rt-single-crtitem'>
                      <div className='product-thumb'>
                        <img
                          src='https://via.placeholder.com/100'
                          alt='product image'
                        />
                      </div>
                      <div className='product-text'>
                        <span className='d-block f-size-16 text-333'>
                          Mans Watch
                        </span>
                        <span className='d-block f-size-14'>
                          printing typesetting
                        </span>
                        <span className='d-block f-size-14 primary-color'>
                          170.00$
                        </span>
                      </div>
                      <div className='product-colose'>
                        <span className='rt-remove-product'>
                          <i className='icofont-close-line'></i>
                        </span>
                      </div>
                    </div>
                    <div className='rt-single-crtitem'>
                      <div className='product-thumb'>
                        <img
                          src='https://via.placeholder.com/100'
                          alt='product image'
                        />
                      </div>
                      <div className='product-text'>
                        <span className='d-block f-size-16 text-333'>
                          Mans Watch
                        </span>
                        <span className='d-block f-size-14'>
                          printing typesetting
                        </span>
                        <span className='d-block f-size-14 primary-color'>
                          170.00$
                        </span>
                      </div>
                      <div className='product-colose'>
                        <span className='rt-remove-product'>
                          <i className='icofont-close-line'></i>
                        </span>
                      </div>
                    </div>
                    <div className='rt-single-crtitem'>
                      <div className='product-thumb'>
                        <img
                          src='https://via.placeholder.com/100'
                          alt='product image'
                        />
                      </div>
                      <div className='product-text'>
                        <span className='d-block f-size-16 text-333'>
                          Mans Watch
                        </span>
                        <span className='d-block f-size-14'>
                          printing typesetting
                        </span>
                        <span className='d-block f-size-14 primary-color'>
                          170.00$
                        </span>
                      </div>
                      <div className='product-colose'>
                        <span className='rt-remove-product'>
                          <i className='icofont-close-line'></i>
                        </span>
                      </div>
                    </div>
                    <div className='cart-footer'>
                      <div className='clearfix'>
                        <div className='float-left'>
                          <span className='text-000 rt-semiblod'>
                            Sub Total
                          </span>
                        </div>
                        <div className='float-right'>
                          <span className='text-000 rt-semiblod'>$850</span>
                        </div>
                      </div>
                      <div className='clearfix'>
                        <div className='float-left'>
                          <span className='text-000 rt-semiblod'>Total</span>
                        </div>
                        <div className='float-right'>
                          <span className='text-000 rt-semiblod'>$850</span>
                        </div>
                      </div>
                      <div className='rt-mt-15'>
                        <Link
                          to='#'
                          className='rt-btn rt-secondary rt-sm2 text-capitalize rt-mr-3'
                        >
                          View Cart
                        </Link>
                        <Link
                          to='#'
                          className='rt-btn rt-gradient rt-sm2 text-capitalize text-white'
                        >
                          View Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='main-header rt-sticky'>
          <nav className='navbar'>
            <div className='container'>
              <Link to='' className='brand-logo'>
                <img width='95px' src={logo} />
              </Link>
              <Link to='' className='sticky-logo'>
                <img width='75px' src={logo} />
              </Link>
              <div className='ml-auto d-flex align-items-center'>
                <div className='main-menu'>
                  <ul>
                    {!loading && (
                      <Fragment>
                        {isAuthenticated ? authLinks : guestLinks}
                      </Fragment>
                    )}
                  </ul>
                </div>
                <div className='rt-nav-tolls d-flex align-items-center'>
                  {!loading && (
                    <Fragment>
                      {' '}
                      {isAuthenticated ? (
                        <Link
                          to='#'
                          onClick={logout}
                          className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'
                        >
                          Logout
                        </Link>
                      ) : (
                          <Link
                            to='/login'
                            className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'
                          >
                            Login
                        </Link>
                        )}{' '}
                    </Fragment>
                  )}
                  <div className='mobile-menu'>
                    <div className='menu-click'>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
