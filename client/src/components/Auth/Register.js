import React, { useState } from 'react';
import { connect } from 'react-redux';
import { registerUser, SendVerificationCodeToEmail } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import Alert from '../Layout/Alert';
import { Redirect } from 'react-router-dom';

import cover from '../../images/banner/breadcump-img.png';
import sectionbg6 from '../../images/all-img/section-bg-6.png';

import cities from '../../utils/cities'

import Fotter from '../Layout/Footer';
import axios from 'axios';
import geolocation from 'geolocation'
import Geocode from 'react-geocode'
const firebase = require('firebase');

const Register = (props) => {
  const {
    registerUser,
    isAuthenticated,
    setAlert,
    code,
    SendVerificationCodeToEmail,
  } = props;

  var timestamp = new Date().getTime().toString();
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    country: '',
    city: '',
    password: '',
    cpassword: '',
    image: '',
  });

  const [confirmationcode, ConfirmCode] = useState('');

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});

  const {
    fname,
    lname,
    email,
    mobile,
    country,
    city,
    password,
    cpassword,
    image,
  } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const [verified, isVerified] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    SendVerificationCodeToEmail(email);
  };

  const setImageName = (e) => {
    setFile(e.target.files[0]);
    setUser({
      ...user,
      image: e.target.files[0].name,
    });
    // setFilename(e.target.files[0].name);
  };

  const verifyCode = (async) => {
    if (confirmationcode !== code) {
      setAlert('Confirmation code is not correct', 'danger');
    } else {
      isVerified(true);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      setAlert('Passwords do not match', 'danger');
    } else if (
      mobile === '' ||
      fname === '' ||
      lname === '' ||
      email === '' ||
      country === '' ||
      city === ''
    ) {
      setAlert('All fields are mandatory', 'danger');
    } else {

      var fileName = timestamp + file.name;
      var storageRef = firebase.storage().ref(fileName);
     // link = "ddddd";
      storageRef.put(file).then(function (snapshot) {
        //  alert("img upload")
        console.log('Image Successfully Uploaded...!');
        const ref = firebase.storage().ref(fileName);
        var res = ref.getDownloadURL().then(async function (url) {
          console.log("this:" + url)
          registerUser({
            fname,
            lname,
            email,
            mobile,
            image: url,
            country,
            city,
            password,
          });
          // updateProfile(data);
          //  alert("Profile Updated Successfully...")
          //  setUimage('');
          // alert(url)
          return url;
        }).catch(err => {
          alert("Image Not Sent");
          console.error("error: " + err)
        });
      });



      // const formData = new FormData();

      // formData.append('file', file);
      // formData.append('imagename', nimage);
      // try {
      //   const res = await axios.post('/upload', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });

      //   const { fileName, filePath } = res.data;

      //   setUploadedFile({ fileName, filePath });
      // } catch (err) {
      //   console.log(err);
      // }

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          (authRes) => {
            const userObj = {
              email: authRes.user.email,
              friends: [],
              messages: [],
            };
            firebase
              .firestore()
              .collection('users')
              .doc(email)
              .set(userObj)
              .then(
                () => {
                  // this.props.history.push('/dashboard');
                },
                (dbErr) => {
                  console.log('Failed to add user to the database: ', dbErr);
                  //   this.setState({ signupError: 'Failed to add user' });
                }
              );
          },
          (authErr) => {
            console.log('Failed to create user: ', authErr);
            //  this.setState({ signupError: 'Failed to add user' });
          }
        );
    }
  };

  function getCity() {
    var latitude = "";
    var longitude = "";

    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw console.log(err)
      latitude = position.coords.latitude
      longitude = position.coords.longitude

      Geocode.setApiKey("AIzaSyBPtIY73T6GVSgcNuiJOVr4lSA3DeQZfc8");

      // set response language. Defaults to english.
      Geocode.setLanguage("en");

      // set response region. Its optional.
      // A Geocoding request with region=es (Spain) will return the Spanish city.
      Geocode.setRegion("pk");

      // Enable or disable logs. Its optional.
      Geocode.enableDebug();

      // Get address from latidude & longitude.

      Geocode.fromLatLng(latitude, longitude).then(
        response => {
          const address = response.results[0].formatted_address;
          console.log(address);
          document.getElementById('city').value = address
        },
        error => {
          console.error(error);
        }
      );
    })
  }

  if (isAuthenticated) {
    return <Redirect to='/auctions' />;
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
                SigUp
              </h4>
              <h4 className='f-size-36 f-size-lg-30 f-size-md-24 f-size-xs-16 rt-light3'>
                Join the most popular Auction community
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
                Please create a new account
              </p>
              <div className='rt-spacer-60'></div>
              {/* /.rt-spacer-60 */}
              <Alert />
              <form onSubmit={onSubmit} className='rt-form rt-line-form'>
                <div>
                  <div className='single-in'>
                    <label
                      for='ss'
                      className='f-size-14 text-878  text-capitalize'
                    >
                      email:
                    </label>
                    <input
                      type='email'
                      id='ss'
                      className='form-control rt-mb-15'
                      name='email'
                      value={email}
                      onChange={onChange}
                    />
                  </div>
                  <br />
                  <div className='single-in'>
                    <button
                      type='button'
                      onClick={sendEmail}
                      style={{
                        padding: '10px',
                        width: '200px',
                        backgroundColor: 'maroon',
                        color: '#fff',
                      }}
                    >
                      Send Confirmation Code{' '}
                    </button>
                  </div>

                  {code && (
                    <div
                      style={{ display: verified === true ? 'none' : 'block' }}
                    >
                      <div className='single-in'>
                        <input
                          type='text'
                          placeholder='Enter verification code'
                          value={confirmationcode}
                          onChange={(e) => ConfirmCode(e.target.value)}
                          name='verification code'
                        />
                      </div>

                      <div className='singlein'>
                        <input
                          type='button'
                          value='verify'
                          onClick={verifyCode}
                          style={{
                            padding: '10px',
                            width: '200px',
                            backgroundColor: 'skyblue',
                            color: 'black',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ display: verified === true ? 'block' : 'none' }}>
                  <div className='single-in'>
                    <label
                      for='ss'
                      className='f-size-14 text-878  text-capitalize'
                    >
                      firstname:
                    </label>
                    <input
                      type='text'
                      id='ss'
                      className='form-control rt-mb-15'
                      name='fname'
                      value={fname}
                      onChange={onChange}
                    />
                  </div>
                  <div className='single-in'>
                    <label
                      for='ss'
                      className='f-size-14 text-878  text-capitalize'
                    >
                      lastname:
                    </label>
                    <input
                      type='text'
                      id='ss'
                      className='form-control rt-mb-15'
                      name='lname'
                      value={lname}
                      onChange={onChange}
                    />
                  </div>
                  <div className='single-in'>
                    <label
                      for='ss'
                      className='f-size-14 text-878  text-capitalize'
                    >
                      mobile:
                    </label>
                    <input
                      type='text'
                      id='ss'
                      className='form-control rt-mb-15'
                      name='mobile'
                      value={mobile}
                      onChange={onChange}
                    />
                  </div>

                  <div className='custom-file mb-4'>
                    <input
                      type='file'
                      className='custom-file-input'
                      id='customFile'
                      name='image'
                      onChange={setImageName}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                      {filename}
                    </label>
                  </div>

                  <div className='single-in'>
                    <label
                      for='ss'
                      className='f-size-14 text-878  text-capitalize'
                    >
                      country:
                    </label>
                    <select
                      name='country'
                      value={country}
                      onChange={onChange}
                      id='ss'
                      className=''
                    >
                      <option value='Afganistan'>Afghanistan</option>
                      <option value='Albania'>Albania</option>
                      <option value='Algeria'>Algeria</option>
                      <option value='American Samoa'>American Samoa</option>
                      <option value='Andorra'>Andorra</option>
                      <option value='Angola'>Angola</option>
                      <option value='Anguilla'>Anguilla</option>
                      <option value='Antigua & Barbuda'>
                        Antigua & Barbuda
                      </option>
                      <option value='Argentina'>Argentina</option>
                      <option value='Armenia'>Armenia</option>
                      <option value='Aruba'>Aruba</option>
                      <option value='Australia'>Australia</option>
                      <option value='Austria'>Austria</option>
                      <option value='Azerbaijan'>Azerbaijan</option>
                      <option value='Bahamas'>Bahamas</option>
                      <option value='Bahrain'>Bahrain</option>
                      <option value='Bangladesh'>Bangladesh</option>
                      <option value='Barbados'>Barbados</option>
                      <option value='Belarus'>Belarus</option>
                      <option value='Belgium'>Belgium</option>
                      <option value='Belize'>Belize</option>
                      <option value='Benin'>Benin</option>
                      <option value='Bermuda'>Bermuda</option>
                      <option value='Bhutan'>Bhutan</option>
                      <option value='Bolivia'>Bolivia</option>
                      <option value='Bonaire'>Bonaire</option>
                      <option value='Bosnia & Herzegovina'>
                        Bosnia & Herzegovina
                      </option>
                      <option value='Botswana'>Botswana</option>
                      <option value='Brazil'>Brazil</option>
                      <option value='British Indian Ocean Ter'>
                        British Indian Ocean Ter
                      </option>
                      <option value='Brunei'>Brunei</option>
                      <option value='Bulgaria'>Bulgaria</option>
                      <option value='Burkina Faso'>Burkina Faso</option>
                      <option value='Burundi'>Burundi</option>
                      <option value='Cambodia'>Cambodia</option>
                      <option value='Cameroon'>Cameroon</option>
                      <option value='Canada'>Canada</option>
                      <option value='Canary Islands'>Canary Islands</option>
                      <option value='Cape Verde'>Cape Verde</option>
                      <option value='Cayman Islands'>Cayman Islands</option>
                      <option value='Central African Republic'>
                        Central African Republic
                      </option>
                      <option value='Chad'>Chad</option>
                      <option value='Channel Islands'>Channel Islands</option>
                      <option value='Chile'>Chile</option>
                      <option value='China'>China</option>
                      <option value='Christmas Island'>Christmas Island</option>
                      <option value='Cocos Island'>Cocos Island</option>
                      <option value='Colombia'>Colombia</option>
                      <option value='Comoros'>Comoros</option>
                      <option value='Congo'>Congo</option>
                      <option value='Cook Islands'>Cook Islands</option>
                      <option value='Costa Rica'>Costa Rica</option>
                      <option value='Cote DIvoire'>Cote DIvoire</option>
                      <option value='Croatia'>Croatia</option>
                      <option value='Cuba'>Cuba</option>
                      <option value='Curaco'>Curacao</option>
                      <option value='Cyprus'>Cyprus</option>
                      <option value='Czech Republic'>Czech Republic</option>
                      <option value='Denmark'>Denmark</option>
                      <option value='Djibouti'>Djibouti</option>
                      <option value='Dominica'>Dominica</option>
                      <option value='Dominican Republic'>
                        Dominican Republic
                      </option>
                      <option value='East Timor'>East Timor</option>
                      <option value='Ecuador'>Ecuador</option>
                      <option value='Egypt'>Egypt</option>
                      <option value='El Salvador'>El Salvador</option>
                      <option value='Equatorial Guinea'>
                        Equatorial Guinea
                      </option>
                      <option value='Eritrea'>Eritrea</option>
                      <option value='Estonia'>Estonia</option>
                      <option value='Ethiopia'>Ethiopia</option>
                      <option value='Falkland Islands'>Falkland Islands</option>
                      <option value='Faroe Islands'>Faroe Islands</option>
                      <option value='Fiji'>Fiji</option>
                      <option value='Finland'>Finland</option>
                      <option value='France'>France</option>
                      <option value='French Guiana'>French Guiana</option>
                      <option value='French Polynesia'>French Polynesia</option>
                      <option value='French Southern Ter'>
                        French Southern Ter
                      </option>
                      <option value='Gabon'>Gabon</option>
                      <option value='Gambia'>Gambia</option>
                      <option value='Georgia'>Georgia</option>
                      <option value='Germany'>Germany</option>
                      <option value='Ghana'>Ghana</option>
                      <option value='Gibraltar'>Gibraltar</option>
                      <option value='Great Britain'>Great Britain</option>
                      <option value='Greece'>Greece</option>
                      <option value='Greenland'>Greenland</option>
                      <option value='Grenada'>Grenada</option>
                      <option value='Guadeloupe'>Guadeloupe</option>
                      <option value='Guam'>Guam</option>
                      <option value='Guatemala'>Guatemala</option>
                      <option value='Guinea'>Guinea</option>
                      <option value='Guyana'>Guyana</option>
                      <option value='Haiti'>Haiti</option>
                      <option value='Hawaii'>Hawaii</option>
                      <option value='Honduras'>Honduras</option>
                      <option value='Hong Kong'>Hong Kong</option>
                      <option value='Hungary'>Hungary</option>
                      <option value='Iceland'>Iceland</option>
                      <option value='Indonesia'>Indonesia</option>
                      <option value='India'>India</option>
                      <option value='Iran'>Iran</option>
                      <option value='Iraq'>Iraq</option>
                      <option value='Ireland'>Ireland</option>
                      <option value='Isle of Man'>Isle of Man</option>
                      <option value='Israel'>Israel</option>
                      <option value='Italy'>Italy</option>
                      <option value='Jamaica'>Jamaica</option>
                      <option value='Japan'>Japan</option>
                      <option value='Jordan'>Jordan</option>
                      <option value='Kazakhstan'>Kazakhstan</option>
                      <option value='Kenya'>Kenya</option>
                      <option value='Kiribati'>Kiribati</option>
                      <option value='Korea North'>Korea North</option>
                      <option value='Korea Sout'>Korea South</option>
                      <option value='Kuwait'>Kuwait</option>
                      <option value='Kyrgyzstan'>Kyrgyzstan</option>
                      <option value='Laos'>Laos</option>
                      <option value='Latvia'>Latvia</option>
                      <option value='Lebanon'>Lebanon</option>
                      <option value='Lesotho'>Lesotho</option>
                      <option value='Liberia'>Liberia</option>
                      <option value='Libya'>Libya</option>
                      <option value='Liechtenstein'>Liechtenstein</option>
                      <option value='Lithuania'>Lithuania</option>
                      <option value='Luxembourg'>Luxembourg</option>
                      <option value='Macau'>Macau</option>
                      <option value='Macedonia'>Macedonia</option>
                      <option value='Madagascar'>Madagascar</option>
                      <option value='Malaysia'>Malaysia</option>
                      <option value='Malawi'>Malawi</option>
                      <option value='Maldives'>Maldives</option>
                      <option value='Mali'>Mali</option>
                      <option value='Malta'>Malta</option>
                      <option value='Marshall Islands'>Marshall Islands</option>
                      <option value='Martinique'>Martinique</option>
                      <option value='Mauritania'>Mauritania</option>
                      <option value='Mauritius'>Mauritius</option>
                      <option value='Mayotte'>Mayotte</option>
                      <option value='Mexico'>Mexico</option>
                      <option value='Midway Islands'>Midway Islands</option>
                      <option value='Moldova'>Moldova</option>
                      <option value='Monaco'>Monaco</option>
                      <option value='Mongolia'>Mongolia</option>
                      <option value='Montserrat'>Montserrat</option>
                      <option value='Morocco'>Morocco</option>
                      <option value='Mozambique'>Mozambique</option>
                      <option value='Myanmar'>Myanmar</option>
                      <option value='Nambia'>Nambia</option>
                      <option value='Nauru'>Nauru</option>
                      <option value='Nepal'>Nepal</option>
                      <option value='Netherland Antilles'>
                        Netherland Antilles
                      </option>
                      <option value='Netherlands'>
                        Netherlands (Holland, Europe)
                      </option>
                      <option value='Nevis'>Nevis</option>
                      <option value='New Caledonia'>New Caledonia</option>
                      <option value='New Zealand'>New Zealand</option>
                      <option value='Nicaragua'>Nicaragua</option>
                      <option value='Niger'>Niger</option>
                      <option value='Nigeria'>Nigeria</option>
                      <option value='Niue'>Niue</option>
                      <option value='Norfolk Island'>Norfolk Island</option>
                      <option value='Norway'>Norway</option>
                      <option value='Oman'>Oman</option>
                      <option value='Pakistan'>Pakistan</option>
                      <option value='Palau Island'>Palau Island</option>
                      <option value='Palestine'>Palestine</option>
                      <option value='Panama'>Panama</option>
                      <option value='Papua New Guinea'>Papua New Guinea</option>
                      <option value='Paraguay'>Paraguay</option>
                      <option value='Peru'>Peru</option>
                      <option value='Phillipines'>Philippines</option>
                      <option value='Pitcairn Island'>Pitcairn Island</option>
                      <option value='Poland'>Poland</option>
                      <option value='Portugal'>Portugal</option>
                      <option value='Puerto Rico'>Puerto Rico</option>
                      <option value='Qatar'>Qatar</option>
                      <option value='Republic of Montenegro'>
                        Republic of Montenegro
                      </option>
                      <option value='Republic of Serbia'>
                        Republic of Serbia
                      </option>
                      <option value='Reunion'>Reunion</option>
                      <option value='Romania'>Romania</option>
                      <option value='Russia'>Russia</option>
                      <option value='Rwanda'>Rwanda</option>
                      <option value='St Barthelemy'>St Barthelemy</option>
                      <option value='St Eustatius'>St Eustatius</option>
                      <option value='St Helena'>St Helena</option>
                      <option value='St Kitts-Nevis'>St Kitts-Nevis</option>
                      <option value='St Lucia'>St Lucia</option>
                      <option value='St Maarten'>St Maarten</option>
                      <option value='St Pierre & Miquelon'>
                        St Pierre & Miquelon
                      </option>
                      <option value='St Vincent & Grenadines'>
                        St Vincent & Grenadines
                      </option>
                      <option value='Saipan'>Saipan</option>
                      <option value='Samoa'>Samoa</option>
                      <option value='Samoa American'>Samoa American</option>
                      <option value='San Marino'>San Marino</option>
                      <option value='Sao Tome & Principe'>
                        Sao Tome & Principe
                      </option>
                      <option value='Saudi Arabia'>Saudi Arabia</option>
                      <option value='Senegal'>Senegal</option>
                      <option value='Seychelles'>Seychelles</option>
                      <option value='Sierra Leone'>Sierra Leone</option>
                      <option value='Singapore'>Singapore</option>
                      <option value='Slovakia'>Slovakia</option>
                      <option value='Slovenia'>Slovenia</option>
                      <option value='Solomon Islands'>Solomon Islands</option>
                      <option value='Somalia'>Somalia</option>
                      <option value='South Africa'>South Africa</option>
                      <option value='Spain'>Spain</option>
                      <option value='Sri Lanka'>Sri Lanka</option>
                      <option value='Sudan'>Sudan</option>
                      <option value='Suriname'>Suriname</option>
                      <option value='Swaziland'>Swaziland</option>
                      <option value='Sweden'>Sweden</option>
                      <option value='Switzerland'>Switzerland</option>
                      <option value='Syria'>Syria</option>
                      <option value='Tahiti'>Tahiti</option>
                      <option value='Taiwan'>Taiwan</option>
                      <option value='Tajikistan'>Tajikistan</option>
                      <option value='Tanzania'>Tanzania</option>
                      <option value='Thailand'>Thailand</option>
                      <option value='Togo'>Togo</option>
                      <option value='Tokelau'>Tokelau</option>
                      <option value='Tonga'>Tonga</option>
                      <option value='Trinidad & Tobago'>
                        Trinidad & Tobago
                      </option>
                      <option value='Tunisia'>Tunisia</option>
                      <option value='Turkey'>Turkey</option>
                      <option value='Turkmenistan'>Turkmenistan</option>
                      <option value='Turks & Caicos Is'>
                        Turks & Caicos Is
                      </option>
                      <option value='Tuvalu'>Tuvalu</option>
                      <option value='Uganda'>Uganda</option>
                      <option value='United Kingdom'>United Kingdom</option>
                      <option value='Ukraine'>Ukraine</option>
                      <option value='United Arab Erimates'>
                        United Arab Emirates
                      </option>
                      <option value='United States of America'>
                        United States of America
                      </option>
                      <option value='Uraguay'>Uruguay</option>
                      <option value='Uzbekistan'>Uzbekistan</option>
                      <option value='Vanuatu'>Vanuatu</option>
                      <option value='Vatican City State'>
                        Vatican City State
                      </option>
                      <option value='Venezuela'>Venezuela</option>
                      <option value='Vietnam'>Vietnam</option>
                      <option value='Virgin Islands (Brit)'>
                        Virgin Islands (Brit)
                      </option>
                      <option value='Virgin Islands (USA)'>
                        Virgin Islands (USA)
                      </option>
                      <option value='Wake Island'>Wake Island</option>
                      <option value='Wallis & Futana Is'>
                        Wallis & Futana Is
                      </option>
                      <option value='Yemen'>Yemen</option>
                      <option value='Zaire'>Zaire</option>
                      <option value='Zambia'>Zambia</option>
                      <option value='Zimbabwe'>Zimbabwe</option>
                    </select>
                  </div>

                  <div className='single-in'>
                    <label
                      for='ss'
                      className='f-size-14 text-878  text-capitalize'
                    >
                      city / Address:
                    </label>
                    <input
                      type="text"
                      name='city'
                      value={city}
                      onFocus={() => { getCity() }}
                      onChange={onChange}
                      id='city'
                      className=''
                    />

                  </div>

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
                      className='form-control rt-mb-15'
                      name='password'
                      value={password}
                      onChange={onChange}
                    />

                    <label
                      for='sss'
                      className='f-size-14 text-878  text-capitalize'
                    >
                      confirm password:
                    </label>
                    <input
                      type='password'
                      id='sss'
                      className='form-control rt-mb-15'
                      name='cpassword'
                      value={cpassword}
                      onChange={onChange}
                    />

                    <button
                      className='rt-icon rt-hw-66 rt-circle f-size-40 icon-dark rt-mt-30'
                      type='submit'
                    >
                      <i className='icofont-paper-plane'></i>
                    </button>
                  </div>
                </div>

                {/* /.single-in */}

                {/* /.single-in */}

                {/* /.single-in */}

                <br />
                {/* /.single-in */}

                {/** upload image */}

                {/* end upload script  */}

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
  code: state.auth.code,
});

export default connect(mapStateToProps, {
  registerUser,
  setAlert,
  SendVerificationCodeToEmail,
})(Register);
