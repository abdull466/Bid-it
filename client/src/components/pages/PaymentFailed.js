import React from 'react';
import axios from 'axios'
import setAuthToken from "../../utils/setAuthToken";

const PaymentSuccess = (props) => {

    setAuthToken(localStorage.getItem('token'));
    if (!localStorage.token) {
        window.location.href = "/";
    }

    alert("PAYMENT_UNSUCCESSFULL")
    window.location.href = '/myWallet'
}

export default PaymentSuccess