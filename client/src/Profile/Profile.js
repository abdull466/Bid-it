import React, { useEffect, Profiler, useState } from 'react';
import ReactStars from 'react-stars'
import { connect } from 'react-redux';
import breadcump from '../images/banner/breadcump-img.png';

import { getProfile } from '../actions/auth';
import {
  getAdsofLoginUser,
  getApprovedAdsofLoginUser,
  getCompletedAdsofLoginUser,
} from '../actions/adactions';
import { updateProfile } from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from '../actions/alert';
import Alert from '../components/Layout/Alert';
import axios from 'axios';

import cities from '../utils/cities'
const firebase = require('firebase')
const Profile = (props) => {

  const {
    setAlert,
    updateProfile,
    user,
    token,
    profile,
    getProfile,
    getAdsofLoginUser,
    getApprovedAdsofLoginUser,
    getCompletedAdsofLoginUser,
    completed,
    bids,
    ad,
  } = props;

  function calRating(rat) {
    // alert(rat)
  }
  const [data, setData] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    country: '',
    city: '',
    image: '',
  });
  var link = "aaa"
  const [userid, setId] = useState(0);
  const [picture, setPicture] = useState('');

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');

  const setImageName = (e) => {
    setUimage(e.target.files[0].name);
    setFile(e.target.files[0]);

    setData({
      ...data,
      image: e.target.files[0].name,
    });
    setFilename(e.target.files[0].name);
  };

  const [uimage, setUimage] = useState('');

  useEffect(async () => {
    await setAuthToken(localStorage.token);

    await getProfile();
    await getAdsofLoginUser();
    await getApprovedAdsofLoginUser();
    await getCompletedAdsofLoginUser();

    // console.log(profile)
    // await setData({
    //   fname: profile.fname ? profile.fname : '',
    //   lname: profile.lname,
    //   email: profile.email,
    //   mobile: profile.mobile,
    //   country: profile.country,
    //   city: profile.city,
    //   image: profile.image,
    // });

    // setPicture(profile.image ? profile.image : '');
    // setId(profile._id ? profile._id : '');
  }, []);

  var timestamp = new Date().getTime().toString();

  const onSubmit = async (e) => {
    e.preventDefault();

    var fileName = file.name;
    var storageRef = firebase.storage().ref(fileName);
    link = "ddddd";
    storageRef.put(file).then(function (snapshot) {
      console.log('Image Successfully Uploaded...!');
      const ref = firebase.storage().ref(file.name);
      var res = ref.getDownloadURL().then(function (url) {
        console.log("this:" + url)
        data.image = link;
        return url;
      }).catch(err => {
        alert("Image Not Sent");
        console.error("error: " + err)
      });
    });

    const nimage = uimage === '' ? image : timestamp + image;

    // data.image = link;

    updateProfile(data);
    setUimage('');
    const formData = new FormData();

    formData.append('file', file);

    formData.append('imagename', link);
    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { fileName, filePath } = res.data;
      setData({
        image: image,
      });
      setPicture(image);

      // setUploadedFile({ fileName, filePath });
    } catch (err) {
      console.log(err);
    }

    //update image

  };

  const { fname, lname, email, mobile, country, city, image } = data;


  return (
    <div>
      <div className='rt-breadcump rt-breadcump-height breaducump-style-2'>
        <div
          className='rt-page-bg rtbgprefix-full'
          style={{ backgroundImage: `url(${breadcump})` }}
        ></div>
        {/* /.rt-page-bg */}
        <div className='container'>
          <div
            className='row rt-breadcump-height align-items-center'
            style={{ height: '300px' }}
          >
            <div className='col-lg-8 col-xl-7 mx-auto text-center text-white'>
              <br />
            </div>
            {/* /.col-12 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </div>
      <br />
      <br />

      <div className='container'>
        <h3 class='rt-section-title'>User Profile</h3>
        <div className='col-sm-6' style={{ display: 'inline-block' }}>
          {profile && (
            <div class='card' style={{ width: '400px', height: '800px' }}>
              <img
                class='card-img-top'
                src={`/uploads/${profile.image}`}
                alt='Card image'
              />
              <div class='card-body'>
                <Alert />
                <form onSubmit={onSubmit}>
                  <input type='hidden' name='userid' value={!!userid ? userid : profile._id} />
                  <input
                    id="fname"
                    type='text'
                    name='fname'
                    value={!!fname ? fname : profile.fname}
                    placeholder="Enter your first name"
                    onChange={onChange}
                  />
                  <input
                    id="lname"
                    type='text'
                    placeholder="Enter your last name"
                    name='lname'
                    value={!!lname ? lname : profile.lname}
                    onChange={onChange}
                  />
                  <input
                    id="email"
                    type='text'
                    name='email'
                    value={profile.email ? profile.email : email}
                    onChange={onChange}
                    readOnly
                  />
                  <div className='single-in'>
                    <select
                      id="country"
                      name='country'
                      value={country}
                      onChange={onChange}

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
                  <br></br>

                  <select
                    id="city"
                    name='city'
                    value={city}
                    onChange={onChange}

                    className='form-control '
                  >
                    {data.country === 'Pakistan' ? cities.map(c => (<option value={`${c.city}`}>{c.city}</option>)) : <option value=''>Not necessary if you are not in Pakistan</option>}
                  </select>

                  <input
                    type='text'
                    name='mobile'
                    value={!!mobile ? mobile : profile.mobile}
                    onChange={onChange}
                  />
                  <input type='hidden' name='uimage' value={uimage} />
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

                  <input
                    type='submit'
                    style={{
                      display: 'block',
                      width: '300px',
                      backgroundColor: '#00B16A',
                      color: '#fff',
                    }}
                    value='Update'
                  />
                </form>
              </div>
            </div>
          )}
        </div>

        <div className='col-sm-6' style={{ display: 'inline-block' }}>
          {profile && (

            <div class='card' style={{ width: '400px' }}>

              <img
                class='card-img-top'
                src={`/uploads/${profile.image}`}
                alt='Card image'
              />
              <div class='card-body'>
                <h4 class='card-title' style={{ textAlign: 'center' }}>
                  <code>{`${profile.fname} ${profile.lname}`}</code>
                </h4>
                <p class='card-text'></p>
                <p class='card-text' style={{ textAlign: 'center' }}>
                  {' '}
                  {profile.email}
                </p>
                <p class='card-text' style={{ textAlign: 'center' }}>
                  {profile.mobile}
                </p>

                {calRating(profile._id)}

                <div style={{ marginLeft: '130px' }}>
                  <ReactStars
                    edit={false}
                    count={5}
                    value={profile.OverAllRating}
                    size={24}
                    color2={'#ffd700'}
                  />
                </div>

                <p class='card-text' style={{ textAlign: 'center' }}>
                  {profile.country}
                </p>
                <p class='card-text' style={{ textAlign: 'center' }}>
                  {profile.city}
                </p>
                <p class='card-text' style={{ textAlign: 'center' }}>
                  Total Ads Posted : {ad && ad.ads.length}
                </p>
                <p class='card-text' style={{ textAlign: 'center' }}>
                  Total Ads Completed : {completed && completed.length}
                </p>
                <p class='card-text' style={{ textAlign: 'center' }}>
                  Total Approved Bids : {bids && bids.length}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapper = (state) => ({
  token: state.auth.token,
  profile: state.auth.profile,
  ad: state.ad,
  bids: state.ad.approved_bids,
  completed: state.ad.completed,
  user: state.auth.user,
});
export default connect(mapper, {
  setAlert,
  getProfile,
  getAdsofLoginUser,
  getApprovedAdsofLoginUser,
  getCompletedAdsofLoginUser,
  updateProfile,
})(Profile);
