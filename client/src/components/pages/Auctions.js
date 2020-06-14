import React, { useEffect, useState } from 'react';
import breadcump from '../../images/banner/breadcump-img.png';
import ReactStars from 'react-stars'
import { Carousel, CarouselItem } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAds, getAllCatagories } from '../../actions/adactions';

import Counter from './counter';
import setAuthToken from '../../utils/setAuthToken';
const Auctions = (props) => {
  const { getAds, ads, getAllCatagories, catagories } = props;
  const [searchInput, setSearchInput] = useState('')
  const [tabIndex, setTabIndex] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => {
    setAuthToken(localStorage.token);
    getAds();
    getAllCatagories()
  }, [getAds]);

  if (!localStorage.token) {
    window.location.href = '/';
  }

  const changePreviousPage = async e => {
    e.preventDefault()
    if (tabIndex > 1) {
      await setTabIndex(tabIndex - 1)
    }
  }

  const changeNextPage = async e => {
    e.preventDefault()
    if (tabIndex < parseInt(ads.length / 6) + 1) {
      await setTabIndex(tabIndex + 1)
    }
  }

  const changePage = async (e, index) => {
    e.preventDefault()
    await setTabIndex(index + 1)
  }

  return (
    <React.Fragment>
      <div class='rt-breadcump rt-breadcump-height breaducump-style-2'>
        <div
          class='rt-page-bg rtbgprefix-full'
          style={{ backgroundImage: `url(${breadcump})` }}
        ></div>
        {/* /.rt-page-bg */}
        <div class='container' style={{ height: '450px' }}>
          <div class='row rt-breadcump-height align-items-center'>
            <div class='col-lg-8 col-xl-7 mx-auto text-center text-white'>
              <h4 class='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3'>
                {' '}
                Bid on Your Favorite Ad
              </h4>
            </div>
            {/* /.col-12 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </div>
      {/* /.rt-bredcump */}
      <section class='page-content-area'>
        <div class='container'>
          <div class='row'>
            <div
              class='col-xl-12 col-lg-10 mx-auto text-center wow fade-in-bottom'
              data-wow-duration='1s'
            >
              <h2 class='rt-section-title'>All Auctions</h2>
              <p class='rt-mb-0 rt-light3 line-height-34 section-paragraph'>
                There are many ways to buy or sell.
              </p>
              <input
                class='form-control mb-4'
                id='tableSearch'
                type='text'
                placeholder='Search Items'
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              ></input>
              <select name="category" onChange={e => setCategoryFilter(e.target.value)}>
                <option value="">All</option>
                {!!catagories ? catagories.map(e => (<option value={`${e.title}`}>{e.title}</option>)) : ''}
              </select>
            </div>
            {/* /.col-xl-7 col-lg-10 mx-auto text-center wow fade-in-bottom */}
          </div>
          {/* /.row */}
          <div class='rt-spacer-60'></div>

          <div class='row'>
            {/* /.col-lg-4 */}

            {/* /.col-lg-4 */}

            {ads.length === 0 ? (
              <div
                style={{
                  color: 'Black',
                  fontSize: '24px',
                  marginTop: '80px',
                  marginLeft: '200px',
                }}
              >
                <h4>No Auction available</h4>
              </div>
            ) : (
                ads.filter(ad => {
                  if (!!categoryFilter) {
                    return ad.category === categoryFilter
                  } else {
                    return ad
                  }
                }).slice((tabIndex - 1) * 6, tabIndex * 6).filter(ad => new RegExp(`${searchInput}`, 'gi').test(ad.title)).map((ad) => (
                  <div class='col-lg-4 col-md-6 mx-auto rt-mb-30'>

                    <div class='rt-single-icon-box wow fade-in-bottom icon-center text-center shdoaw-style2 rt-pt-35 rt-pb-35'>
                      <div class='icon-thumb'>

                        <Carousel>
                          {ad.image.map((e) => {

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
                      </div>

                      {/* /.icon-thumb */}

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

                          <div class='iconbox-content'>
                            <h5 class='f-size-36 f-size-lg-28 rt-normal rt-mb-25'>
                              {ad.title}
                            </h5>
                            <p class='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                              {ad.description}
                            </p>
                            <p class='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                              {`Category ${ad.category}`}
                            </p>
                            <p class='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                              {ad.minbid}
                            </p>

                            <p class='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                              <p style={{ marginLeft: '120px' }}>
                                <ReactStars
                                  edit={false}
                                  count={5}
                                  value={ad.userRating}
                                  size={24}
                                  color2={'#ffd700'}
                                />
                              </p>
                            </p>


                            {new Date(ad.end).getTime() < new Date().getTime() ? (
                              <p> Bid Time has been expired</p>
                            ) : (
                                [
                                  ad.closebid === true ? (
                                    <p> Bid Has been closed</p>
                                  ) : (
                                      <div>
                                        <p
                                          style={{
                                            color: `${!ad.status}` ? 'lime' : 'red',
                                          }}
                                        >
                                          {' '}
                                          {!ad.status ? ' Pending' : 'Closed'}{' '}
                                        </p>
                                        <Counter time={ad.end} />
                                        <br />

                                        <Link
                                          to={`/bids/${ad._id}`}
                                          class='rt-btn rt-outline-gray pill text-uppercase'
                                        >
                                          Bid
                              </Link>
                                      </div>
                                    ),
                                ]
                              )}
                          </div>
                      }
                      {/* /.iconbox-content */}
                    </div>

                    {/* /.rt-single-icon-box wow fade-in-bottom */}

                  </div>
                ))
              )}

            {/* /.col-lg-4 */}
          </div>
          {/* /.row */}
        </div>
        {/* ./ copntainer */}
      </section>
      <nav aria-label='Page navigation example'>
        <ul class='pagination justify-content-center'>
          {ads.length > 0 ? <li class={tabIndex === 1 ? 'page-item disabled' : 'page-item'}>
            <a class='page-link' href='#' onClick={e => changePreviousPage(e)}>
              Previous
            </a>
          </li> : ''}
          {ads.map((ad, index) => {
            if (index % 6 === 0) {
              return (<li class='page-item'>
                <a class='page-link' href='#' onClick={e => changePage(e, index / 6)}>
                  {index / 6 + 1}
                </a>
              </li>)
            }
          })}
          {ads.length > 0 ? <li class={tabIndex === parseInt(ads.length / 6 + 1) ? 'page-item disabled' : 'page-item'}>
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
  auth: state.auth.isAuthenticated,
  role: state.auth.role,

  ads: state.ad.auctions,
  catagories: state.ad.catagories
});
export default connect(mapper, { getAds, getAllCatagories })(Auctions);
