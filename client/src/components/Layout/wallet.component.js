

import React, { useEffect, Component } from 'react';
import './walletLayout.css'
import cover from '../../images/banner/breadcump-img.png';
import Recharge from './rechargeDialog'
import axios from 'axios'
import { connect } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";

export default class WalletLayout extends Component {


  constructor(props) {

    super(props);
    this.state = {
      balance: 0,
      transactions: [],
      dp: ''
    }
  }

  componentDidMount(props) {

    setAuthToken(localStorage.getItem('token'));
    if (!localStorage.token) {
      window.location.href = "/";
    }


    var transactions = [];

    axios.get('api/users/myWallet')
      .then(response => {
        this.setState({
          dp: response.data.dp,
          name: response.data.name,
          balance: response.data.balance,
          transactions: response.data.trans
        })
        localStorage.setItem('currBal', this.state.balance)
      })
      .catch(error => {
        console.log("error", error);
      });

  }

  render() {
    return (

      < React.Fragment >

        <div class="container">
          <div class="iphone">
            <div class="header" style={{ backgroundImage: `url(${cover})` }}>
              <div class="header-summary">
                <div class="summary-text">
                  <b> My Balance </b>
                </div>
                <div class="summary-balance">
                  PKR {this.state.balance.toFixed(2)} /-
                      </div>

              </div>
              <div class="user-profile">
                <img src={this.state.dp} class="user-photo" />
                <div class="t-title">
                  {this.state.name}
                </div>
              </div>
            </div>
            <div class="content">
              <div class="card">
                <div class="upper-row">
                  <div class="card-item">
                    <span>Active Balance</span>
                    <h4 class="dollar"> PKR {this.state.balance.toFixed(2)} /-</h4>
                  </div>
                  <div class="card-item">
                    <span>My Save it</span>
                    <h4 class="dollar"> PKR {this.state.balance.toFixed(2)} /-</h4>
                  </div>
                </div>
                <div class="lower-row">
                  <div class="icon-item">
                    <div class="icon"><i class="fas fa-upload"></i></div>
                    <Recharge name={"Recharge"} />
                  </div>
                  <div class="icon-item" >
                    <div class="icon"  ><i class="fas fa-money-check-alt"></i></div>
                    <Recharge name={"Withdraw"} /> </div>
                  <div class="icon-item">
                    <div class="icon"><i class="fas fa-paper-plane"></i></div>
                    <Recharge name={"Send"} /> </div>
                  <div class="icon-item">
                    <div class="icon"><i class="fas fa-wallet"></i></div>
                    <Recharge name={"Pay"} />  </div>
                </div>
              </div>
              <span class="t-desc">Recent Transactions : {this.state.transactions.length}</span>

              <div class="transactions" >

                {
                  this.state.transactions.map((e) => {
                    var imgURL = ""
                    switch (e.agent) {
                      case "JazzCash":
                        imgURL = "https://www.jazzcash.com.pk/assets/uploads/2016/05/jazzcash-logo-200x200.png"
                        break;

                      case "EasyPaisa":
                        imgURL = "https://lh3.googleusercontent.com/fffhh1hNndjg-H7mA5VCtbkZ_FR8gmkBGgQFbp6v8CCki-mAM_gSeLZ2UofIQuAZtFQ"
                        break;

                      case "Credit / Debit Card":
                        imgURL = "https://cdn2.iconfinder.com/data/icons/fintech-butterscotch-vol-2/512/Wallet-512.png"
                        break;
                    }

                    return (
                      <div class="transaction">
                        <div class="t-icon-container">
                          <img src={imgURL} alt="agent" class="t-icon" />
                        </div>
                        <div class="t-details">
                          <div class="t-title">{e.agent}</div>
                          <div class="t-time">{e.date}
                          </div>
                        </div>
                        <div class="t-for">  {e.for}
                        </div>
                        <div class="t-amount"> PKR {e.amount} /-
                       </div>
                      </div>
                    )
                  })
                }
                {/* <div class="transaction">
                  <div class="t-icon-container"><img src="https://lh3.googleusercontent.com/fffhh1hNndjg-H7mA5VCtbkZ_FR8gmkBGgQFbp6v8CCki-mAM_gSeLZ2UofIQuAZtFQ" class="t-icon" /></div>
                  <div class="t-details">
                    <div class="t-title">EasyPaisa</div>
                    <div class="t-time">04:15 PM
              </div>
                  </div>
                  <div class="t-amount"> PKR 890 /-
            </div>
                </div>

                <div class="transaction">
                  <div class="t-icon-container"><img src="https://cdn2.iconfinder.com/data/icons/fintech-butterscotch-vol-2/512/Wallet-512.png" class="t-icon" /></div>
                  <div class="t-details">
                    <div class="t-title">Wallet</div>
                    <div class="t-time">08:00 PM
              </div>
                  </div>
                  <div class="t-amount red"> PKR 8900 /-
            </div>
                </div> */}

              </div>
            </div>
            {/* <div class="drawer">
            <span><i class="fas fa-home"></i></span>
            <span><i class="fas fa-chart-bar"></i></span>
            <div class="menu-btn"><i class="fas fa-plus"></i></div>
            <span></span>
            <span><i class="fas fa-sticky-note"></i> </span>
            <span><i class="fas fa-user"></i> </span>
          </div> */}

          </div>
        </div>

      </React.Fragment >

    );
  }
};




