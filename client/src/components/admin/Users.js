import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllusers, getProfile, deleteUserByAdmin, blockUserByAdmin } from '../../actions/auth';
import setAuthToken from '../../utils/setAuthToken';
import breadcump from '../../images/banner/breadcump-img.png';
import { getAllAds } from '../../actions/adactions';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import Spinner from '../Layout/Spinner';
import Profile from '../../Profile/Profile';
import { stat } from 'fs';

const Users = (props) => {
  const { getProfile } = props;
  const { getAllusers, profiles, getAllAds, ads, deleteUserByAdmin, blockUserByAdmin } = props;
  const [searchInput, setSearchInput] = useState('')
  const [tabIndex, setTabIndex] = useState(1)

  const { bids } = ads;

  useEffect(() => {
    setAuthToken(localStorage.token);
    getAllusers();
    getProfile();
    getAllAds();
  }, []);

  function getLength({ id, bids }) {
    var i = 0;
    bids.map((ad) => {
      if (ad.user.toString() === id) {
        i = i + 1;
      }
    });

    return <p>{i}</p>;
  }
  function TotalApprovedBids({ id }) {
    var i = 0;

    ads.map((ad) => {
      ad.bids.map((bid) => {
        if (bid.user.toString() === id && bid.status === true) {
          i = i + 1;
        }
      });
    });

    return <p>{i}</p>;
  }
  function AdsLength({ id }) {
    var i = 0;
    ads.map((ad) => {
      if (ad.user.toString() === id) {
        i = i + 1;
      }
    });

    return <p>{i}</p>;
  }

  // function fetchProfile(id) {
  //   const filter = { userId: id };
  //   const url = '/api/users/userInfo';
  //   axios
  //     .post(url, filter)
  //     .then((response) => {
  //       const res = response.data.user.mobile;
  //       alert(res);
  //       if (res === false) {
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //     });
  // }

  const changePreviousPage = async e => {
    e.preventDefault()
    if (tabIndex > 1) {
      await setTabIndex(tabIndex - 1)
    }
  }

  const changeNextPage = async e => {
    e.preventDefault()
    if (tabIndex < parseInt(profiles.length / 6) + 1) {
      await setTabIndex(tabIndex + 1)
    }
  }

  const changePage = async (e, index) => {
    e.preventDefault()
    await setTabIndex(index + 1)
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
                Completed Bids Feedback
              </h6>
            </div>
            {/* /.col-12 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </div>

      <div>
        <h3 class='rt-section-title'>
          {' '}
          All Registered Users{' '}
          <p> Total Users : {profiles && profiles.length} </p>{' '}
        </h3>
      </div>

      <div class='container'>
        <input
          class='form-control mb-4'
          id='tableSearch'
          type='text'
          placeholder='Search Items'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        ></input>
        <table>
          <tr>
            <th> # </th>
            <th> First name </th>
            <th> Last name</th>
            <th> Country </th>
            <th> City </th>
            <th> Total Ads Posted </th>
            <th> Total Approved Bids </th>
            <th> Actions </th>
          </tr>

          {profiles.length === 0 ? (
            <Spinner />
          ) : (
              profiles.filter(profile => new RegExp(`${searchInput}`, 'gi').test(`${profile.fname} ${profile.lname}`)).map((profile, index) => (
                <tr>
                  <td>{index}</td>
                  <td>{profile.fname}</td>
                  <td>{profile.lname}</td>
                  <td>{profile.country}</td>
                  <td>{profile.city}</td>

                  <td>
                    <AdsLength id={profile._id} />
                  </td>

                  <td>
                    <TotalApprovedBids id={profile._id} />
                  </td>

                  <td>

                    <Link className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block' to={`/admin/users/profile/${profile._id}`}>
                      <i class="fas fa-address-card">
                        View
                      </i>
                    </Link>
<br></br>

                    <Link className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block' style={{ color: 'red' }}>
                      <i style={{ color: 'white' }} class="fas fa-trash-alt" onClick={() => deleteUserByAdmin(profile._id)}>
                        Delete
                    </i>
                    </Link>
                    <br></br>

                    {
                      profile.status === "BLOCKED" ?

                        <Link className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'>
                          <i class="fas fa-unlock-alt" onClick={() => blockUserByAdmin(profile._id, "Unblock")}>
                            Unblock
                        </i>
                        </Link>
                        :
                        <Link className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'>
                          <i class="fas fa-user-slash" onClick={() => blockUserByAdmin(profile._id, "Block")}>
                            Block
                        </i>
                        </Link>
                    }

                  </td>

                </tr>
              ))
            )}
        </table>
      </div>

      <nav aria-label='Page navigation example'>
        <ul class='pagination justify-content-center'>
          {profiles.length > 0 ? <li class={tabIndex === 1 ? 'page-item disabled' : 'page-item'}>
            <a class='page-link' href='#' onClick={e => changePreviousPage(e)}>
              Previous
            </a>
          </li> : ''}
          {profiles.map((ad, index) => {
            if (index % 6 === 0) {
              return (<li class='page-item'>
                <a class='page-link' href='#' onClick={e => changePage(e, index / 6)}>
                  {index / 6 + 1}
                </a>
              </li>)
            }
          })}
          {profiles.length > 0 ? <li class={tabIndex === parseInt(profiles.length / 6 + 1) ? 'page-item disabled' : 'page-item'}>
            <a class='page-link' href='#' onClick={e => changeNextPage(e)}>
              Next
            </a>
          </li> : ''}
        </ul>
      </nav>
    </React.Fragment>
  );
};

const mapper = (state) => ({
  profiles: state.auth.profiles,
  ads: state.ad.auctions,
});
export default connect(mapper, { getAllusers, getAllAds, getProfile, deleteUserByAdmin, blockUserByAdmin })(Users);
