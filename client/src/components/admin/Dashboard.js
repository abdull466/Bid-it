import React, { useEffect, useState } from 'react';
import breadcump from '../../images/banner/breadcump-img.png';
import Users from './Users';
import setAuthToken from '../../utils/setAuthToken';
import { connect } from 'react-redux';
import Alert from '../Layout/Alert';
import {
  getAllAds,
  getAllCatagories,
  submitCategory,
} from '../../actions/adactions';

const Dashboard = (props) => {
  const {
    getAllAds,
    ads,

    getAllCatagories,
    catagories,
    submitCategory,
  } = props;

  useEffect(() => {
    setAuthToken(localStorage.token);
    getAllAds();
    getAllCatagories();

    //getAllusers();
  }, []);

  const [category, setCategory] = useState('');

  const onChange = (e) => {
    setCategory(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    submitCategory(category);
    setCategory('');
  };

  if (!localStorage.token) {
    window.location.href = '/login';
  }

  return (
    <React.Fragment>
      <div className='rt-breadcump rt-breadcump-height breaducump-style-2'>
        <div
          className='rt-page-bg rtbgprefix-full'
          style={{ backgroundImage: `url(${breadcump})` }}
        ></div>
        {/* /.rt-page-bg */}
        <div className='container' style={{ height: '300px' }}>
          <div className='row rt-breadcump-height align-items-center'>
            <div className='col-lg-8 col-xl-7 mx-auto text-center text-white'>
              <h6 className='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3'>
                {' '}
              </h6>
            </div>
            {/* /.col-12 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </div>

      <div
        class='col-xl-12 col-lg-10 mx-auto text-center wow fade-in-bottom'
        data-wow-duration='1s'
      >
        <h2>Welcome to Admin | Dashboard</h2>
      </div>
    </React.Fragment>
  );
};
const mapper = (state) => ({
  profiles: state.auth.profiles,
  current: state.ad.todayads,
  ads: state.ad.auctions,
  catagories: state.ad.catagories,
});
export default connect(mapper, { getAllAds, getAllCatagories, submitCategory })(
  Dashboard
);
