import React from 'react';
import axios from 'axios'
import setAuthToken from "../../utils/setAuthToken";
import swal from 'sweetalert'

const PaymentSuccess = (props) => {

    setAuthToken(localStorage.getItem('token'));
    if (!localStorage.token) {
        window.location.href = "/";
    }

    swal("Oops! PAYMENT_UNSUCCESSFULL", "Something went wrong!", "error");
    window.location.href = '/myWallet'
}

export default PaymentSuccess