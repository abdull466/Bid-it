import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import breadcump from '../../images/banner/breadcump-img.png';

import ReactStars from 'react-stars';
import Divider from '@material-ui/core/Divider';
import { Container, Row, Col, Carousel, CarouselItem } from 'react-bootstrap'
import {
  getApprovedAdsofLoginUser,
  submitFeedback,
  submitAditionalFeedback,
  submitPayment,
  getAllCatagories
} from '../../actions/adactions';
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setAuthToken from '../../utils/setAuthToken';
import Alert from '../Layout/Alert';
import swal from 'sweetalert';
import visamaster from '../visamaster.JPG'
import * as RBS from 'react-bootstrap'
import $ from 'jquery'
var rupee = ""
var title = ""
var desc = "Description Here"
var userFound = false;
var currUser = ""
var rEditable = false;
var afRating = 0
var paymentId = ""
var aditionalFeedback = false;
const ApproveBids = (props) => {
  const {
    getApprovedAdsofLoginUser,
    bids,
    submitFeedback,
    submitAditionalFeedback,
    submitPayment,
    getAllCatagories,
    catagories
  } = props;
  const [feedback, setFeedback, phone] = useState('');
  const [show, setShow] = useState(false);

  const [count, setCount] = useState(0);

  const [payment, CompletePayment] = useState({
    account: 'Paypal',
    accountid: '',
  });

  const [searchInput, setSearchInput] = useState('')
  const [tabIndex, setTabIndex] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState('')

  const onChange = (e) => {
    setFeedback(e.target.value);
  };

  const ratingChanged = (newRating) => {
    setCount(newRating);
  };
  const onPaymentChange = (e) => {
    CompletePayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const confirm = () => {
    console.log('working');
  };
  const issuePayment = (id) => {
    const { account, accountid } = payment;
    submitPayment(id, {
      account: account,
      accountid: accountid,
    });

    CompletePayment({
      account: 'PayPal',
      accountid: '',
    });

    document.getElementById(`alert_${id}`).style.display = 'block';
    document.getElementById(`paymentform_${id}`).style.display = 'none';

    setInterval(() => {
      document.getElementById(`alert_${id}`).style.display = 'none';
    }, 3000);
  };

  const onSubmit = (id) => {
    //  e.preventDefault();
    const obj = {
      feedback: feedback,
      rating: count,
    };
    submitFeedback(id, obj);
    setFeedback('');
    document.getElementById(`alert_${id}`).style.display = 'block';
    document.getElementById(`form_${id}`).style.display = 'none';

    setInterval(() => {
      document.getElementById(`alert_${id}`).style.display = 'none';
      document.getElementById(`btn_${id}`).style.display = 'none';
    }, 3000);
    setShow(!show);
  };

  const onSubmitAF = (id) => {
    //  e.preventDefault();
    const obj = {
      feedback: feedback
    }

    submitAditionalFeedback(id, obj);
    setFeedback('');

    document.getElementById(`alert_${id}`).style.display = 'block';
    document.getElementById(`AFform_${id}`).style.display = 'none';

    setInterval(() => {
      document.getElementById(`alert_${id}`).style.display = 'none';
      document.getElementById(`btn_${id}`).style.display = 'none';
    }, 3000);
    setShow(!show);
  };

  useEffect(() => {
    setAuthToken(localStorage.token);
    getApprovedAdsofLoginUser();
    getAllCatagories()
  }, [getApprovedAdsofLoginUser]);


  const shower = (id) => {
    var element = document.getElementById(`form_${id}`);
    if (element.style.display === 'none') {
      element.style.display = 'block';
      document.getElementById(`btn_${id}`).innerText = 'Not Now';
    } else {
      element.style.display = 'none';
      document.getElementById(`btn_${id}`).innerText = 'Feedback';
    }
  };

  const showerAF = (id) => {
    var element = document.getElementById(`AFform_${id}`);
    if (element.style.display === 'none') {
      element.style.display = 'block';
      document.getElementById(`btn_${id}`).innerText = 'Not Now';
    } else {
      element.style.display = 'none';
      document.getElementById(`btn_${id}`).innerText = 'Additional Feddback';
    }
  };

  const { accountid, account } = payment;

  function chatTo(id) {
    const filter = { userId: id };
    const url = '/api/users/userInfo';
    axios
      .post(url, filter)
      .then((res) => {
        const email = res.data.email;

        window.open(
          'https://webbiding-chatapp.firebaseapp.com/dashboard/' + email,
          '_blank'
        );

        if (res === false) {
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  function onPaymentClick(pkr, name, description, id) {
    rupee = pkr
    title = name
    desc = description
    paymentId = id
    document.getElementById('myBids').hidden = true
    document.getElementById('myModal2').hidden = false
    document.getElementById('pagNav').hidden = true
  }

  function onJazzCashPayment(id) {

    var tel = document.getElementById('phoneNumber').value;
    if (tel === "" || tel === null) {
      document.getElementById('phoneNumber').style.borderColor = 'red'
      document.getElementById('numError').innerText = "* Required"
    }
    else if (tel.length < 11) {
      document.getElementById('numError').innerText = "Should be 11 digits"
    }
    else if ($("#phoneNumber").val().charAt(0) === '0' &&
      $("#phoneNumber").val().charAt(1) === '3'
    ) {
      document.getElementById('jazzcashLoading').hidden = false
      document.getElementById('jazzcashPane').hidden = true
      document.getElementById('pagNav').hidden = false
      donePayment(id)
      setTimeout(function () {
        toast("Success! Check Phone for details", { type: "success" });
        setTimeout(function () {
          window.location.reload()
        }, 2000);
      }, 3000);
    }
    else {
      document.getElementById('numError').innerText = "Should be Valid Number"
    }
  }

  function onEasyPaisaPayment(id) {
    var tel = document.getElementById('phoneNumber2').value;
    if (tel === "" || tel === null) {
      document.getElementById('phoneNumber2').style.borderColor = 'red'
      document.getElementById('numError2').innerText = "* Required"
    }
    else if (tel.length < 11) {
      document.getElementById('numError2').innerText = "Should be 11 digits"
    }
    else if ($("#phoneNumber2").val().charAt(0) === '0' &&
      $("#phoneNumber2").val().charAt(1) === '3'
    ) {
      document.getElementById('easypaisaLoading').hidden = false
      document.getElementById('easypaisaPane').hidden = true
      document.getElementById('pagNav').hidden = false
      donePayment(id)
      setTimeout(function () {
        toast("Success! Check Phone for details", { type: "success" });
        setTimeout(function () {
          window.location.reload()
        }, 2000);
      }, 3000);
    }
    else {
      document.getElementById('numError2').innerText = "Should be Valid Number"
    }
  }

  function oncodPayment(id) {
    document.getElementById('codLoading').hidden = false
    document.getElementById('codPane').hidden = true
    document.getElementById('pagNav').hidden = false
    donePayment(id)
    setTimeout(function () {
      toast("Success! Check Phone / Email for details", { type: "success" });
      setTimeout(function () {
        window.location.reload()
      }, 2000);
    }, 3000);
  }

  function onewalletPayment(id) {
    document.getElementById('ewalletLoading').hidden = false
    document.getElementById('ewalletPane').hidden = true
    document.getElementById('pagNav').hidden = false
    donePayment(id)
    setTimeout(function () {
      toast("Success! Check Phone / Email for details", { type: "success" });
      setTimeout(function () {
        window.location.reload()
      }, 2000);
    }, 3000);
  }

  function donePayment(id) {
    const filter = {
      id: id
    }
    const url = '/api/ads/donePayment';
    axios
      .post(url, filter)
      .then((res) => {
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  function onPaymentClose() {
    document.getElementById('myBids').hidden = false
    document.getElementById('myModal').hidden = true
    document.getElementById('pagNav').hidden = false
  }

  const changePreviousPage = async e => {
    e.preventDefault()
    if (tabIndex > 1) {
      await setTabIndex(tabIndex - 1)
    }
  }

  const changeNextPage = async e => {
    e.preventDefault()
    if (tabIndex < parseInt(bids.length / 6) + 1) {
      await setTabIndex(tabIndex + 1)
    }
  }

  const changePage = async (e, index) => {
    e.preventDefault()
    await setTabIndex(index + 1)
  }


  async function handleToken(token, addresses) {
    // const product = {
    //   name: title,
    //   price: rupee,
    //   description: desc
    // };
    // const response = await axios.post(
    //   "https://opn6p.sse.codesandbox.io/checkout",
    //   { token, product }
    // );
    // const { status } = response.data;
    // console.log("Response:", response.data);
    // if (status === "success") {
    //   setTimeout(function () {
    //     toast("Success! Check email for details", { type: "success" });
    //     setTimeout(function () {
    //       window.location.reload()
    //     }, 2000);
    //   }, 3000);
    // } else {
    //   setTimeout(function () {
    //     toast("Something went wrong", { type: "error" });
    //     setTimeout(function () {
    //       window.location.reload()
    //     }, 2500);
    //   }, 2000);
    // }
  //  alert(paymentId)
    donePayment(paymentId)
    window.location.reload()
    setTimeout(function () {
      toast("Success! Check email for details", { type: "success" });
      setTimeout(function () {
        window.location.reload()
      }, 1000);
    }, 1000);
    document.getElementById('pagNav').hidden = false
  }

  function validateNumber() {
    var val = document.getElementById('phoneNumber').value;
    val = val.replace(/[^\d]/, '')
    document.getElementById('phoneNumber').value = val
  }

  function validateNumber2() {
    var val = document.getElementById('phoneNumber2').value;
    val = val.replace(/[^\d]/, '')
    document.getElementById('phoneNumber2').value = val
  }

  function onSBNext(e) {
    e.preventDefault();
    document.getElementById('myModal2').hidden = true
    document.getElementById('myModal').hidden = false
    //document.getElementById('myModal2').hidden = true
  }

  function onSBClose() {
    document.getElementById('myModal2').hidden = true
    document.getElementById('myBids').hidden = false
  }

  function onGoBack() {
    document.getElementById('myModal2').hidden = false
    document.getElementById('myModal').hidden = true
  }
  toast.configure();
  $("#checkbox").change(function () {
    if (this.checked) {
      document.getElementById('form2').hidden = true

      document.getElementById('fname2').value = document.getElementById('fname').value
      document.getElementById('lname2').value = document.getElementById('lname').value
      document.getElementById('stAddress2').value = document.getElementById('stAddress').value
      document.getElementById('CN2').value = document.getElementById('CN').value
      document.getElementById('aptAddress2').value = document.getElementById('aptAddress').value
      document.getElementById('bCity2').value = document.getElementById('bCity').value
      document.getElementById('bPCode2').value = document.getElementById('bPCode').value
      document.getElementById('bCountry2').value = document.getElementById('bCountry').value
    }
    else {
      document.getElementById('form2').hidden = false
    }
  });
  $("#form").submit(function (e) {
    e.preventDefault();
    document.getElementById('myModal2').hidden = true
    document.getElementById('myModal').hidden = false
  });

  axios
    .get("/api/authentication/currUser")
    .then(response => {
      currUser = response.data.usr
    })
    .catch(error => {
      console.log("error", error);
    });
  // $("input").intlTelInput({
  //   utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js"
  // });
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
                Approved Bids
              </h6>
            </div>
            {/* /.col-12 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </div>
      {/* /.rt-bredcump */}

      <div hidden={true} id="myModal2" style={{ 'height': 'auto' }}>
        {/* <h6 className='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3 align-items-center'>
          {' '} <b>Complete Your Payment</b>
        </h6> */}

        <h3 className='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3'>
          {' '}
          <b>Online Payments</b>
        </h3>

        {/* BILLING & SHIPPING ADDRESS */}

        <RBS.Modal.Dialog  >
          <form id="form">
            <RBS.Modal.Header closeButton onClick={() => onSBClose()}>
              <RBS.Modal.Title>Provide Billing and Shipping Address</RBS.Modal.Title>
            </RBS.Modal.Header>

            <RBS.Modal.Body style={{ 'height': 'auto', 'width': '500px' }}>
              <RBS.Tab.Container id="left-tabs-example" >

                <div>
                  <div class="container">



                    <fieldset>
                      <legend>Shipping Address</legend>
                      <p class="input-wrapper lg-half">
                        <label for="billing-first-name">First Name</label>
                        <input type="text" name="billing-first-name" id="fname" required />

                      </p>
                      <p class="input-wrapper lg-half">
                        <label for="billing-last-name">Last Name</label>
                        <input type="text" name="billing-last-name" id="lname" required />

                      </p>
                      <p class="input-wrapper lg-half">
                        <label for="billing-street-address">Street Address</label>
                        <input type="text" name="billing-street-address" id="stAddress" required />

                      </p>
                      <p class="input-wrapper lg-third">
                        <label for="billing-postal-code">Contact Number</label>
                        <input type="text" name="billing-contact-number" id="CN" required />

                      </p>
                      <p class="input-wrapper lg-third">
                        <label for="billing-apt-address">Apt/Suite</label>
                        <input type="text" name="billing-apt-address" id="aptAddress" />

                      </p>
                      <p class="input-wrapper lg-half">
                        <label for="billing-city">City</label>
                        <input type="text" name="billing-city" id="bCity" required />

                      </p>
                      <p class="input-wrapper lg-third">
                        <label for="billing-postal-code">Zip/Postal Code</label>
                        <input type="text" name="billing-postal-code" id="bPCode" required />

                      </p>

                      <p class="input-wrapper lg-half">
                        <label for="billing-country">Country</label></p>
                      <input type="text" id="bCountry" list="bCountry" name="billing-country" required />
                      <datalist id="billing-country-list">
                        <option value="Pakistan - PK" />

                      </datalist>

                    </fieldset>
                    <input id="checkbox" type="checkbox" name="" />
                    <label for="same-address">Billing Address is the Same as Shipping</label>

                    <fieldset id="form2">
                      <legend>Billing Address</legend>
                      <p class="input-wrapper lg-half">
                        <label for="billing-first-name">First Name</label>
                        <input type="text" name="billing-first-name" id="fname2" required />

                      </p>
                      <p class="input-wrapper lg-half">
                        <label for="billing-last-name">Last Name</label>
                        <input type="text" name="billing-last-name" id="lname2" required />

                      </p>
                      <p class="input-wrapper lg-half">
                        <label for="billing-street-address">Street Address</label>
                        <input type="text" name="billing-street-address" id="stAddress2" required />

                      </p>
                      <p class="input-wrapper lg-third">
                        <label for="billing-postal-code">Contact Number</label>
                        <input type="text" name="billing-postal-code" id="CN2" required />

                      </p>
                      <p class="input-wrapper lg-third">
                        <label for="billing-apt-address">Apt/Suite</label>
                        <input type="text" name="billing-apt-address" id="aptAddress2" />

                      </p>
                      <p class="input-wrapper lg-half">
                        <label for="billing-city">City</label>
                        <input type="text" name="billing-city" id="bCity2" required />

                      </p>
                      <p class="input-wrapper lg-third">
                        <label for="billing-postal-code">Zip/Postal Code</label>
                        <input type="text" name="billing-postal-code" id="bPCode2" required />

                      </p>

                      <p class="input-wrapper lg-half">
                        <label for="billing-country">Country</label></p>
                      <input type="text" id="bCountry2" list="billing-country-list" name="billing-country" required />
                      <datalist id="billing-country-list">
                        <option value="Pakistan - PK" />

                      </datalist>

                    </fieldset>





                    {/* <p class="submit-wrap"><button class="btn">Next: Payment Information &rarr;</button></p> */}

                  </div>
                </div>

              </RBS.Tab.Container>
            </RBS.Modal.Body>

            <RBS.Modal.Footer>
              <button onSubmit={(e) => { onSBNext() }} className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'>Next: Payment Information &rarr;</button>

            </RBS.Modal.Footer>
          </form>
        </RBS.Modal.Dialog>
      </div>

      <div hidden={true} id="myModal" style={{ 'height': '800px' }}>
        {/* <h6 className='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3 align-items-center'>
          {' '} <b>Complete Your Payment</b>
        </h6> */}

        <h3 className='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3'>
          {' '}
          <b>Online Payments</b>
        </h3>


        {/* PAYMENT METHODS */}

        <RBS.Modal.Dialog >
          <RBS.Modal.Header closeButton onClick={() => onPaymentClose()}>
            <button style={{ color: 'white', backgroundColor: 'red', border: 'none' }} onClick={() => { onGoBack() }}>
              🡄
             </button>

            <h4 style={{ marginLeft: '50px' }}> Choose Your Payment Method   </h4>
          </RBS.Modal.Header>

          <RBS.Modal.Body style={{ 'height': 'auto' }}>
            <RBS.Tab.Container id="left-tabs-example" >
              <RBS.Row>
                <RBS.Col sm={2}>
                  <RBS.Nav variant="pills" className="flex-column" style={{ outline: 0, boxShadow: 'none', borderRight: '1px solid gray', 'height': '290px' }}>
                    <Divider />
                    <RBS.Nav.Item>
                      <RBS.Nav.Link eventKey="first"><img src={"https://www.jazzcash.com.pk/assets/uploads/2016/05/jazzcash-logo-200x200.png"} /></RBS.Nav.Link>
                    </RBS.Nav.Item>


                    <Divider />
                    <RBS.Nav.Item>
                      <RBS.Nav.Link eventKey="second"><img src={"https://easypaisa.com.pk/wp-content/uploads/2019/10/Header-Icon.png"} /></RBS.Nav.Link>
                    </RBS.Nav.Item>
                    <Divider />

                    <br></br>
                    <RBS.Nav.Item>
                      <Divider />
                      <RBS.Nav.Link eventKey="third">
                        <img src={"https://www.nicepng.com/png/full/54-542683_credit-card-pay-now-visa-and-mastercard-accepted.png"} />
                      </RBS.Nav.Link>
                      <Divider />
                    </RBS.Nav.Item>

                    <br></br>
                    <RBS.Nav.Item>
                      <Divider />
                      <RBS.Nav.Link eventKey="forth">
                        <img src={"https://mehmart.com/wp-content/uploads/2019/09/cod.png"} />
                      </RBS.Nav.Link>
                      <Divider />
                    </RBS.Nav.Item>

                    <br></br>
                    <RBS.Nav.Item>
                      <Divider />
                      <RBS.Nav.Link eventKey="fifth">
                        <img src={"https://cdn2.iconfinder.com/data/icons/fintech-butterscotch-vol-2/512/Wallet-512.png"} />
                      </RBS.Nav.Link>
                      <Divider />
                    </RBS.Nav.Item>

                  </RBS.Nav>

                </RBS.Col>
                <RBS.Col sm={10}>
                  <RBS.Tab.Content>

                    <RBS.Tab.Pane eventKey="first" >
                      <img id="jazzcashLoading" src={"https://developertest.jazzcash.com.pk/store/site/themes/wso2/images/loader.gif"} hidden={true} />
                      <div id="jazzcashPane" style={{ 'text-align': 'center' }}>
                        <img width="100px" src={"https://nayatel.com/wp-content/uploads/2018/11/jazzcash-logo-200x200.png"} />
                        <br></br>
                        Reciever's Number
                        <br></br>

                        <input id="phoneNumber" maxLength={11} onKeyUp={() => { validateNumber() }} placeholder="e.g 03077211556" required={true} />
                        <br></br>
                        <span id="numError"></span>
                        <br></br>       <br></br>
                        <div style={{ marginLeft: '130px' }}><button onClick={() => { onJazzCashPayment() }} className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'><b>Pay Now</b></button>
                        </div>
                      </div>
                    </RBS.Tab.Pane>

                    <RBS.Tab.Pane eventKey="second">
                      <br></br>
                      <img id="easypaisaLoading" src={"https://developertest.jazzcash.com.pk/store/site/themes/wso2/images/loader.gif"} hidden={true} />
                      <div id="easypaisaPane" style={{ 'text-align': 'center' }}>
                        <img width="170px" src={"https://easypaisa.com.pk/wp-content/uploads/2019/10/Header-Icon.png"} />
                        <br></br>  <br></br>
                        Reciever's Number
                        <br></br>
                        <input id="phoneNumber2" maxLength={11} onKeyUp={() => { validateNumber2() }} placeholder="e.g 03077211556" />
                        <br></br>
                        <span id="numError2"></span>
                        <br></br>      <br></br>
                        <div style={{ marginLeft: '130px' }}> <button onClick={() => { onEasyPaisaPayment(paymentId) }} className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'><b>Pay Now</b></button>
                        </div></div>
                    </RBS.Tab.Pane>
                    <RBS.Tab.Pane eventKey="third">
                      <br></br><br></br><br></br>
                      <StripeCheckout
                        style={{ marginLeft: '80px' }}
                        stripeKey="pk_test_5DWODAZ4Hx8ZRJMGo9nsm9GQ00Pdz17AB0"
                        token={handleToken}
                        amount={rupee}
                        name={title}
                      />
                    </RBS.Tab.Pane>
                    <RBS.Tab.Pane eventKey="forth">
                      <img id="codLoading" src={"https://developertest.jazzcash.com.pk/store/site/themes/wso2/images/loader.gif"} hidden={true} />
                      <div id="codPane" style={{ 'text-align': 'center' }}>
                        <img width="200px" src={" https://cdn.iconscout.com/icon/free/png-512/cash-on-delivery-1851572-1569297.png"} />
                        <br></br><br></br>
                        <div style={{ marginLeft: '100px' }}>  <button onClick={() => { oncodPayment(paymentId) }} className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'><b>Confirm Paymenet</b></button>
                        </div> </div>

                    </RBS.Tab.Pane>

                    <RBS.Tab.Pane eventKey="fifth">
                      <img id="ewalletLoading" src={"https://developertest.jazzcash.com.pk/store/site/themes/wso2/images/loader.gif"} hidden={true} />
                      <div id="ewalletPane" style={{ 'text-align': 'center' }}>
                        <img width="250px" src={"https://peerbits-wpengine.netdna-ssl.com/wp-content/uploads/2019/11/digital-wallet-payment-be-the-leaders.png"} />
                        <br></br><br></br>
                        <div style={{ marginLeft: '100px' }}>  <button onClick={() => { onewalletPayment(paymentId) }} className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'><b>Pay from Wallet</b></button>
                        </div> </div>

                    </RBS.Tab.Pane>

                  </RBS.Tab.Content>
                </RBS.Col>
              </RBS.Row>
            </RBS.Tab.Container>
          </RBS.Modal.Body>

          <RBS.Modal.Footer>
            <RBS.Button variant="secondary" onClick={() => onPaymentClose()}>Close</RBS.Button>

          </RBS.Modal.Footer>
        </RBS.Modal.Dialog>
      </div>

      <section className='page-content-area' id="myBids">
        <div className='container'>
          {/* /.row */}

          <div className='rt-spacer-60'></div>
          <h3 class='rt-section-title'>Approved Bids</h3>
          <div className='row'>
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

            {bids.length === 0 ? (
              <div
                style={{
                  color: 'Black',
                  fontSize: '24px',
                  marginTop: '80px',
                  marginLeft: '200px',
                }}
              >
                <h4>No Approved Bids So far</h4>
              </div>
            ) : (
                bids.filter(ad => {
                  if (!!categoryFilter) {
                    return ad.category === categoryFilter
                  } else {
                    return ad
                  }
                }).slice((tabIndex - 1) * 6, tabIndex * 6).filter(ad => new RegExp(`${searchInput}`, 'gi').test(ad.title)).map((ad) => (

                  <div className='col-lg-4 col-md-6 mx-auto rt-mb-30' >
                    <div className='rt-single-icon-box wow fade-in-bottom icon-center text-center shdoaw-style2 rt-pt-35 rt-pb-35'>
                      <div className='icon-thumb'>
                        <Carousel>
                          {ad.image.map((e) => {

                            return (
                              <Carousel.Item>

                                <img
                                  className="d-block w-100"
                                  src={`http://localhost:3000/ads/${e}`}
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
                              <div className='iconbox-content'>
                                <h5 className='f-size-36 f-size-lg-28 rt-normal rt-mb-25'>
                                  {ad.title}
                                </h5>
                                <p className='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                                  {ad.description}
                                </p>
                                <p class='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                                  {ad.category}
                                </p>
                                <p className='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                                  {'Original Bid Price  ' + ad.minbid}
                                </p>

                                <p className='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                                  {'Approved Bid Price  ' + ad.issued_price}
                                </p>

                                <p className='line-height-34 rt-light3 rt-mb-0 section-p-content'>
                                  {'Seller Rating '}
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

                                <br />

                                <div id={`alert_${ad._id}`} style={{ display: 'none' }}>
                                  <Alert />
                                </div>

                                {ad.ispayment === true ? (
                                  <div>
                                    {
                                      ad.comments.length > 0 ?
                                        ad.comments.map(e => {
                                          if (e.user === currUser) {
                                            userFound = true
                                            afRating = e.rating
                                          }
                                          else {
                                            userFound = false
                                            afRating = 0
                                          }
                                        }
                                        ) :
                                        userFound = false
                                    }
                                    {userFound === true ? (

                                      <button
                                        to='#'
                                        id={`btn_${ad._id}`}
                                        onClick={() => showerAF(ad._id)}
                                        className='rt-btn rt-outline-gray pill text-uppercase'
                                      >
                                        Additional Feedback
                            </button>
                                    ) : (
                                        <button
                                          to='#'
                                          id={`btn_${ad._id}`}
                                          onClick={() => shower(ad._id)}
                                          className='rt-btn rt-outline-gray pill text-uppercase'
                                        >
                                          Feedback
                          </button>
                                      )}
                                  </div>
                                ) : (

                                    <div>
                                      <button
                                        to='#'
                                        id={`paymentbtn_${ad._id}`}
                                        onClick={() => onPaymentClick(ad.issued_price, ad.title, ad.description, ad._id)}
                                        className='rt-btn rt-outline-gray pill text-uppercase'
                                      >
                                        Complete Payment
                          </button>
                                      {/* 
                          <Text
                            style={{ color: 'blue' }}
                            onPress={() =>
                              Linking.openURL(
                                'https://webbiding-chatapp.firebaseapp.com/dashboard/'
                              )
                            }
                          >
                            Chat
                          </Text> */}
                                      <button
                                        onClick={() => chatTo(ad.user)}
                                        className='rt-btn rt-outline-gray pill text-uppercase'
                                      >
                                        CHAT NOW
                          </button>
                                      {/* 
                          <a
                            target='_blank'
                            href='https://webbiding-chatapp.firebaseapp.com/dashboard/'
                          >
                            CHAT NOW
                          </a> */}
                                    </div>
                                  )}
                              </div>

                              <form
                                style={{ display: 'none' }}
                                id={`paymentform_${ad._id}`}
                              >
                                <select
                                  name='account'
                                  value={account}
                                  onChange={onPaymentChange}
                                >
                                  <option selected value='Paypal'>
                                    PayPal
                        </option>
                                  <option value='Credit Card'>Credit Card</option>
                                </select>
                                <input
                                  type='text'
                                  required
                                  name='accountid'
                                  value={accountid}
                                  onChange={onPaymentChange}
                                  placeholder='Account Number'
                                />

                                <button
                                  type='button'
                                  onClick={() => issuePayment(ad._id)}
                                  style={{
                                    backgroundColor: '#4CAF50' /* Green */,
                                    border: 'none',
                                    width: '100%',

                                    color: 'white',

                                    margin: '0 auto',
                                    textAlign: 'center',
                                    textDecoration: 'none',

                                    display: 'inline-block',
                                    fontSize: '16px',
                                    margin: '4px 2px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {' '}
                                  Issue Payment{' '}
                                </button>
                              </form>

                              <form style={{ display: 'none' }} id={`form_${ad._id}`}>
                                <div style={{ margin: '0 auto', textAlign: 'center' }}>
                                  <p style={{ marginLeft: '110px', marginTop: '10px' }}>
                                    <ReactStars
                                      count={5}
                                      value={count}
                                      onChange={ratingChanged}
                                      size={24}
                                      color2={'#ffd700'}
                                    />
                                  </p>
                                </div>
                                <input
                                  type='text'
                                  required
                                  name='text'
                                  value={feedback}
                                  onChange={onChange}
                                  placeholder='Enter your feedback'
                                />
                                <button
                                  type='button'
                                  onClick={() => onSubmit(ad._id)}
                                  style={{
                                    backgroundColor: '#4CAF50' /* Green */,
                                    border: 'none',
                                    width: '100%',

                                    color: 'white',

                                    margin: '0 auto',
                                    textAlign: 'center',
                                    textDecoration: 'none',

                                    display: 'inline-block',
                                    fontSize: '16px',
                                    margin: '4px 2px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {' '}
                                  Submit Feedback{' '}
                                </button>
                              </form>

                              <form style={{ display: 'none' }} id={`AFform_${ad._id}`}>
                                <div style={{ margin: '0 auto', textAlign: 'center' }}>
                                  <p style={{ marginLeft: '110px', marginTop: '10px' }}>
                                    <ReactStars
                                      edit={false}
                                      count={5}
                                      value={afRating}
                                      onChange={ratingChanged}
                                      size={24}
                                      color2={'#ffd700'}
                                    />
                                  </p>
                                </div>
                                <input
                                  type='text'
                                  required
                                  name='text'
                                  value={feedback}
                                  onChange={onChange}
                                  placeholder='Enter your Additional feedback'
                                />
                                <button
                                  type='button'
                                  onClick={() => onSubmitAF(ad._id)}
                                  style={{
                                    backgroundColor: '#4CAF50' /* Green */,
                                    border: 'none',
                                    width: '100%',

                                    color: 'white',

                                    margin: '0 auto',
                                    textAlign: 'center',
                                    textDecoration: 'none',

                                    display: 'inline-block',
                                    fontSize: '16px',
                                    margin: '4px 2px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {' '}
                                  Submit Additional Feedback{' '}
                                </button>
                              </form>
                            </div>
                          )}
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
      <nav aria-label='Page navigation example' id="pagNav">
        <ul class='pagination justify-content-center'>
          {bids.length > 0 ? <li class={tabIndex === 1 ? 'page-item disabled' : 'page-item'}>
            <a class='page-link' href='#' onClick={e => changePreviousPage(e)}>
              Previous
            </a>
          </li> : ''}
          {bids.map((ad, index) => {
            if (index % 6 === 0) {
              return (<li class='page-item'>
                <a class='page-link' href='#' onClick={e => changePage(e, index / 6)}>
                  {index / 6 + 1}
                </a>
              </li>)
            }
          })}
          {bids.length > 0 ? <li class={tabIndex === parseInt(bids.length / 6 + 1) ? 'page-item disabled' : 'page-item'}>
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
  bids: state.ad.approved_bids,
  catagories: state.ad.catagories,
});
export default connect(mapper, {
  getApprovedAdsofLoginUser,
  submitFeedback,
  submitAditionalFeedback,
  submitPayment,
  getAllCatagories
})(ApproveBids);
