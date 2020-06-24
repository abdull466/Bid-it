import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import About from './components/pages/About';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import store from './store';
import { Provider } from 'react-redux';
import Home from './components/Home';

import Wallet from './components/pages/Wallet'

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import Footer from './components/Layout/Footer';
import Auctions from './components/pages/Auctions';
import Ads from './components/pages/Ads';
import Bid from './components/pages/Bid';
import ApproveBids from './components/pages/ApproveBids';
import PersonalFeedback from './components/pages/PersonalFeedback';
import Profile from './Profile/Profile';
import Dashboard from './components/admin/Dashboard';

import CHAT from './components/pages/myChat'

import ContactUs from './components/pages/ContactUs';
import Users from './components/admin/Users';
import Catagories from './components/admin/Catagories';
import TotalAdsPosted from './components/admin/TotalAdsPosted';
import TotalApprovedBids from './components/admin/ApprovedBids';
import ProfileUser from './components/admin/ProfileUser';

import PaymentSeccess from './components/pages/PaymentSuccess'
import PaymentFailed from './components/pages/PaymentFailed'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const firebase = require('firebase');
require('firebase/firestore'); // Required for side-effects?????

firebase.initializeApp({
  apiKey: 'AIzaSyD8Cv51eKlevrpZ7ihnYyAQTehMJOmOczQ',
  authDomain: 'webbiding-chatapp.firebaseapp.com',
  databaseURL: 'https://webbiding-chatapp.firebaseio.com',
  projectId: 'webbiding-chatapp',
  storageBucket: 'webbiding-chatapp.appspot.com',
  messagingSenderId: '158591991087',
  appId: '1:158591991087:web:b472b1ba8dda08ca8ff5da',
  measurementId: 'G-TKZ07Q217W',
});

// return firebase.database().ref('/users/' + '956a2e68-86fa-4fad-a2d1-7daf73b536e6').once('value').then(function (snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   alert(username)
//   // ...
// });

function App(props) {
  useEffect(() => {
    console.log(localStorage.getItem('token'));
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar title='Bid-t Online' {...props} />
          <Switch>
            <Route exact path='/about' component={About} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />

            <Route exact path='/' component={Home} />
            <Route exact path='/auctions' component={Auctions} />
            <Route exact path='/approvedbids' component={ApproveBids} />
            <Route exact path='/adsfeedback' component={PersonalFeedback} />
            <Route exact path='/ads' render={(props) => <Ads {...props} />} />
            <Route exact path='/bids/:id' component={Bid} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/contactus' component={ContactUs} />
            <Route exact path='/myWallet' component={Wallet} />

            <Route exact path='/myWallet/card_payment/success/' component={PaymentSeccess} />
            <Route exact path='/myWallet/card_payment/failed' component={PaymentFailed} />

            <Route exact path='/myChat' component={CHAT} />

            <Route exact path='/dashboard' component={Dashboard} />

            <Route exact path='/admin/users' component={Users} />
            <Route exact path='/admin/users/profile/:id' component={ProfileUser} />
            <Route exact path='/admin/catagories' component={Catagories} />
            <Route exact path='/admin/postedads' component={TotalAdsPosted} />
            <Route
              exact
              path='/admin/approvedbids'
              component={TotalApprovedBids}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
