

import React from 'react';
import './walletLayout.css'
import cover from '../../images/banner/breadcump-img.png';
import Recharge from './rechargeDialog'

const WalletLayout = (props) => {
  return (
    <React.Fragment>

      <div class="container">
        <div class="iphone">
          <div class="header" style={{ backgroundImage: `url(${cover})` }}>
            <div class="header-summary">
              <div class="summary-text">
                <b> My Balance </b>
              </div>
              <div class="summary-balance">
                PKR 10,000 /-
                      </div>

            </div>
            <div class="user-profile">
              <img src="https://www.pngitem.com/pimgs/m/334-3344170_user-vector-user-flat-png-transparent-png.png" class="user-photo" />
            </div>
          </div>
          <div class="content">
            <div class="card">
              <div class="upper-row">
                <div class="card-item">
                  <span>Active Balance</span>
                  <h4 class="dollar"> PKR 10,000 /-</h4>
                </div>
                <div class="card-item">
                  <span>My Save it</span>
                  <h4 class="dollar"> PKR 2000 /-</h4>
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
            <div class="transactions"><span class="t-desc">Recent Transactions</span>
              <div class="transaction">
                <div class="t-icon-container">
                  <img src="https://www.jazzcash.com.pk/assets/uploads/2016/05/jazzcash-logo-200x200.png"
                    class="t-icon" /></div>
                <div class="t-details">
                  <div class="t-title">JazzCash</div>
                  <div class="t-time">03:45 AM
              </div>
                </div>
                <div class="t-amount"> PKR 7500 /-
            </div>
              </div>

              <div class="transaction">
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
              </div>
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
};

export default WalletLayout;






