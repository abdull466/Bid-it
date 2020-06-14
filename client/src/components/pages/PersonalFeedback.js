import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCompletedAdsofLoginUser, getAllCatagories } from '../../actions/adactions';
import Spinner from '../Layout/Spinner';
import breadcump from '../../images/banner/breadcump-img.png';
import ReactStars from 'react-stars';
import setAuthToken from '../../utils/setAuthToken';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import { Carousel, CarouselItem } from 'react-bootstrap'
var currUser = ""
// const [count, setCount] = useState(0);
function clickRB(id, usr) {
  document.getElementById(`RBButton${id}`).style.display = 'none'
  document.getElementById(`rateBack${id}`).style.display = 'block'
}

function cancelRB(id) {
  document.getElementById(`RBButton${id}`).style.display = ''
  document.getElementById(`rateBack${id}`).style.display = 'none'
}




const PersonalFeedback = ({ completed, getCompletedAdsofLoginUser, getAllCatagories, catagories }) => {

  const [count, setCount] = useState(0);
  function ratingChanged(newRating) {
    setCount(newRating)
  };
  const [searchInput, setSearchInput] = useState('')
  const [tabIndex, setTabIndex] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => {
    //  getAds()
    setAuthToken(localStorage.token);
    getCompletedAdsofLoginUser();
    getAllCatagories()
  }, []);

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
    if (tabIndex < parseInt(completed.length / 6) + 1) {
      await setTabIndex(tabIndex + 1)
    }
  }

  const changePage = async (e, index) => {
    e.preventDefault()
    await setTabIndex(index + 1)
  }

  function submitRB(id, user) {
    const obj = {
      ad: id,
      user: user,
      rating: count
    }
    axios
      .post("/api/ads/rateBackUser/", obj)
      .then(response => {
        console.log("OK");
      })
      .catch(error => {
        console.log("error", error);
      });
    document.getElementById(`RBButton${id}`).style.display = 'block'
    document.getElementById(`rateBack${id}`).style.display = 'none'
    window.location.reload();
  }

  return (
    < React.Fragment >
      <div class='rt-breadcump rt-breadcump-height breaducump-style-2'>
        {/* {  
      completed.filter(ad => {
        alert(ad.user)
    })
  } */}
        <div
          class='rt-page-bg rtbgprefix-full'
          style={{ backgroundImage: `url(${breadcump})` }}
        ></div>
        {/* /.rt-page-bg */}
        <div class='container' style={{ height: '300px' }}>
          <div class='row rt-breadcump-height align-items-center'>
            <div class='col-lg-8 col-xl-7 mx-auto text-center text-white'>
              <h6 class='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3'>
                {' '}
              </h6>
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
          {/* /.row */}

          <div class='rt-spacer-60'></div>
          <h3 class='rt-section-title'>Ads FeedBack</h3>
          <div class='row'>
            {/* /.col-lg-4 */}

            {/* /.col-lg-4 */}

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

            {completed.length === 0 ? (
              <div
                style={{
                  color: 'Black',
                  fontSize: '24px',
                  marginTop: '80px',
                  marginLeft: '200px',
                }}
              >
                <h4>No Ads FeedBack So far</h4>
              </div>
            ) : (
                completed.filter(ad => {
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
(
  <div>
                      <div class='iconbox-content'>
                        <h5 class='f-size-36 f-size-lg-28 rt-normal rt-mb-25'>
                          {ad.title}
                        </h5>
                        <p class='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                          {ad.description}
                        </p>
                        <p class='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                          {ad.category}
                        </p>
                        <p class='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                          {'Original Bid Price  ' + ad.minbid}
                        </p>

                        <p class='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                          {'Approved Bid Price  ' + ad.issued_price}
                        </p>

                        <br />
                      </div>

                      <div>
                        {ad.comments.length === 0 ? (
                          <p> No Feedback </p>
                        ) : (
                            ad.comments.map((comment) => (
                              <div>
                                <code>{comment.firstname}</code>
                                <pre>{comment.text}
                                  <p style={{ marginLeft: '100px' }}>
                                    <ReactStars
                                      edit={false}
                                      count={5}
                                      value={comment.rating}
                                      size={24}
                                      color2={'#ffd700'}
                                    />
                                  </p>
                                </pre>
                                <Divider />
                                <br></br>

                                {
                                  ad.isRatedBack ? <p>Rated</p> :
                                    <div>
                                      <div id={`rateBack${ad._id}`} style={{ display: 'none' }}>

                                        <p style={{ marginLeft: '100px' }}>
                                          <ReactStars
                                            edit={true}
                                            count={5}
                                            value={count}
                                            onChange={ratingChanged}
                                            size={24}
                                            color2={'#ffd700'}
                                          />
                                        </p>
                                        <button className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  ' id={`RBSubmit${ad._id}`} onClick={() => { submitRB(ad._id, comment.user) }}>Submit</button>
                                        <button className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2 ' id={`RBCancel${ad._id}`} onClick={() => { cancelRB(ad._id) }}>Cancel</button>

                                      </div>
                                      <div>
                                        <button className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  ' id={`RBButton${ad._id}`} onClick={() => { clickRB(ad._id, comment.user) }}>Rate Buyer</button>
                                      </div>
                                    </div>
                                }

                              </div>

                            ))
                          )}

                        {ad.aditionalFeedback.length === 0 ? (
                          <p> No Feedback </p>
                        ) : (
                            ad.aditionalFeedback.map((comment) => (
                              <div>
                                <code>{comment.firstname}</code>
                                <pre>{comment.text}
                                </pre>
                              </div>
                            ))
                          )}
                      </div>
</div>)}
                     
                    </div>
                    
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
          {completed.length > 0 ? <li class={tabIndex === 1 ? 'page-item disabled' : 'page-item'}>
            <a class='page-link' href='#' onClick={e => changePreviousPage(e)}>
              Previous
            </a>
          </li> : ''}
          {completed.map((ad, index) => {
            if (index % 6 === 0) {
              return (<li class='page-item'>
                <a class='page-link' href='#' onClick={e => changePage(e, index / 6)}>
                  {index / 6 + 1}
                </a>
              </li>)
            }
          })}
          {completed.length > 0 ? <li class={tabIndex === parseInt(completed.length / 6 + 1) ? 'page-item disabled' : 'page-item'}>
            <a class='page-link' href='#' onClick={e => changeNextPage(e)}>
              Next
            </a>
          </li> : ''}
        </ul>
      </nav>
    </React.Fragment >
  );
};

const mapper = (state) => ({
  completed: state.ad.completed,
  catagories: state.ad.catagories
});
export default connect(mapper, { getCompletedAdsofLoginUser, getAllCatagories })(
  PersonalFeedback
);
