import React, { useEffect, useState } from 'react';
import breadcump from '../../images/banner/breadcump-img.png';
import {
  getAllAds,
  getAllCatagories,
  submitCategory,
  deleteAdByAdmin,
  blockAdByAdmin
} from '../../actions/adactions';
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem } from 'react-bootstrap'
import setAuthToken from '../../utils/setAuthToken';
import { connect } from 'react-redux';
import Alert from '../Layout/Alert';

const TotalApprovedBids = (props) => {
  const { getAllAds, ads, getAllCatagories, catagories, deleteAdByAdmin, blockAdByAdmin } = props;
  const [searchInput, setSearchInput] = useState('')
  const [tabIndex, setTabIndex] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => {
    setAuthToken(localStorage.token);
    getAllAds();
    getAllCatagories()

    //getAllusers();
  }, []);

  if (!localStorage.token) {
    window.location.href = '/login';
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

      <div className='container'>
        <h3 class='rt-section-title'> Total Approved Bids</h3>

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
        <div className='row'>
          <div className='' style={{}}>
            {ads &&
              ads.filter(ad => {
                if (!!categoryFilter) {
                  return ad.category === categoryFilter
                } else {
                  return ad
                }
              }).slice((tabIndex - 1) * 6, tabIndex * 6).filter(ad => new RegExp(`${searchInput}`, 'gi').test(ad.title)).map((ad) => [
                ad.status === true ? (
                  <div
                    className="card"
                    style={{ display: 'inline-block', width: '400px', marginLeft: '30px' }}
                  >
                    <Carousel>
                      {ad.image.map((e) => {

                        return (
                          <Carousel.Item>

                            <img
                              className="d-block"
                              src={`http://localhost:3000/ads/${e}`}
                              alt="box-icon"
                              style={{ width: "400px" }}
                              draggable="false"
                            />

                          </Carousel.Item>
                        )
                      })
                      }
                    </Carousel>
                    <div key={ad._id} class='card-body'>
                      <h4
                        className='card-title'
                        style={{ textAlign: 'center' }}
                      >
                        <code>{ad.title}</code>
                      </h4>
                      <p className='card-text'></p>
                      <p className='card-text' style={{ textAlign: 'center' }}>
                        {' '}
                        {ad.description}
                      </p>
                      <p className='card-text' style={{ textAlign: 'center' }}>
                        {ad.minbid}
                      </p>
                      <p className='card-text' style={{ textAlign: 'center' }}>
                        {ad.address}
                      </p>

                      <p className='card-text' style={{ textAlign: 'center' }}>
                        Total Bids on Ad: {ad.bids.length}
                      </p>

                      <p class='card-text' className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block' style={{ textAlign: 'center' }}>
                        <Link>
                          <i class="fas fa-trash-alt" style={{ color: 'white' }} onClick={() => deleteAdByAdmin(ad._id)}>
                            Delete
                        </i>
                        </Link>
                      </p>


                      <p class='card-text' className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block' style={{ textAlign: 'center' }}>

                        {
                          ad.auth_status === "BLOCKED" ?
                            <Link>
                              <i class="fas fa-unlock-alt" style={{ color: 'white' }} onClick={() => blockAdByAdmin(ad._id, "Unblock")}>
                                Unblock
                            </i>
                            </Link>

                            :
                            <Link >
                              <i class="fas fa-user-slash" style={{ color: 'white' }} onClick={() => blockAdByAdmin(ad._id, "Block")}>
                                Block
                        </i>
                            </Link>
                        }

                      </p>

                    </div>

                    {/* <div className='card-header'>
                      {ad.comments.length === 0 ? (
                        <div className='card-header'> No feedback </div>
                      ) : (
                          ad.comments.map((comment) => (
                            <div>
                              <div className='card-title'>
                                {comment.firstname}
                                <br />
                                <code>{comment.text}</code>
                              </div>
                            </div>
                          ))
                        )}
                    </div> */}
                  </div>
                ) : (
                    <p></p>
                  ),
              ])}
          </div>
        </div>
      </div>
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
  ads: state.ad.auctions,
  catagories: state.ad.catagories
});
export default connect(mapper, { getAllAds, getAllCatagories, deleteAdByAdmin, blockAdByAdmin })(TotalApprovedBids);
