import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import Alert from '../Layout/Alert';

import cover from '../../images/banner/breadcump-img.png';
import sectionbg6 from '../../images/all-img/section-bg-6.png';

import Fotter from '../Layout/Footer';
const firebase = require('firebase');
const Login = (props) => {
  const { login, isAuthenticated, setAlert, role, roleUser } = props;
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === '' || email === '') {
      setAlert('All fields are required', 'danger');
    } else {
      login(user);

      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {
          firebase.get('/dashboard');
          return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          alert(user.email);
        } else {
          // No user is signed in.
        }
      });
      //   firebase
      //     .auth()
      //     .signInWithEmailAndPassword(email, password)
      //     .then(
      //       () => {
      //         alert('Firebase Logged In');
      //         // this.props.history.push('/dashboard');
      //       },
      //       (err) => {
      //         alert('ERROR');
      //         // this.setState({ serverError: true });
      //         console.log('Error logging in: ', err);
      //       }
      //     );
      // }
    }
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated) {
    if (roleUser.role === false) {
      return <Redirect to='/auctions' />;
    }

    if (roleUser.role === true) {
      return <Redirect to='/dashboard' />;
    }
  }

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
                Login
              </h4>
              <h4 className='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3'>
                Welcome back! Great to see you again
              </h4>
            </div>
            {/* /.col-12 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </div>{' '}
      {/* /.rt-bredcump */}
      <div
        className='page-content rtbgprefix-full bg-hide-md rt-pt-130 rt-pb-130 rt-pt-lg-0 rt-pb-lg-0 bg-elements-parent'
        style={{ backgroundImage: `url(${sectionbg6})` }}
      >
        <div className='rt-bg-elemtnts rt-shape-ani-9'>
          <div className='spin-container'>
            <div className='shape'>
              <div className='bd border_bg-1'></div>
            </div>
          </div>
        </div>
        {/* /.rt-shape-ani-1 */}
        <div className='rt-bg-elemtnts rt-shape-ani-10'>
          <div className='spin-container'>
            <div className='shape'>
              <div className='bd border_bg-2'></div>
            </div>
          </div>
        </div>
        {/* /.rt-shape-ani-1 */}
        <div className='rt-bg-elemtnts rt-shape-ani-11'>
          <div className='spin-container'>
            <div className='shape'>
              <div className='bd border_bg-3'></div>
            </div>
          </div>
        </div>
        {/* /.rt-shape-ani-1 */}
        <div className='rt-bg-elemtnts rt-shape-ani-12'>
          <div className='spin-container'>
            <div className='shape'>
              <div className='bd border_bg-2'></div>
            </div>
          </div>
        </div>
        {/* /.rt-shape-ani-1 */}
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-7'>
              <h2 className='rt-section-title'>Welcome to Bid-It</h2>
              <p className='rt-light3 f-size-18 line-height-34 rt-mb-0'>
                Please login to your account
                <Alert />
              </p>
              <div className='rt-spacer-60'></div>
              {/* /.rt-spacer-60 */}
              <form onSubmit={onSubmit} className='rt-form rt-line-form'>
                <div className='single-in'>
                  <label
                    for='ss'
                    className='f-size-14 text-878  text-capitalize'
                  >
                    email:
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    id='ss'
                    className='form-control rt-mb-15'
                  />
                </div>
                {/* /.single-in */}
                <div className='single-in'>
                  <label
                    for='sss'
                    className='f-size-14 text-878  text-capitalize'
                  >
                    password:
                  </label>
                  <input
                    type='password'
                    id='sss'
                    name='password'
                    value={password}
                    onChange={onChange}
                    className='form-control rt-mb-15'
                  />
                  <div className='d-block float-right f-size-14'>
                    {' '}
                    <a href='#'>Forgot your password?</a>
                  </div>
                  <button
                    className='rt-icon rt-hw-66 rt-circle f-size-40 icon-dark rt-mt-30'
                    type='submit'
                  >
                    <i className='icofont-paper-plane'></i>
                  </button>
                </div>
                {/* /.single-in */}
              </form>
            </div>
            {/* /.col-lg-6 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </div>
      {/* /.page-content */}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
  roleUser: state.auth.user,
});

export default connect(mapStateToProps, { login, setAlert })(Login);
