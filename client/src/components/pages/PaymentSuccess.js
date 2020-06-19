import React from 'react';
import axios from 'axios'
import setAuthToken from "../../utils/setAuthToken";
import { match } from 'assert';

const PaymentSuccess = (props) => {

    console.log(props)

    setAuthToken(localStorage.getItem('token'));
    if (!localStorage.token) {
        window.location.href = "/";
    }
    var rupee = new URLSearchParams(props.location.search).get("PKR");
    var type = new URLSearchParams(props.location.search).get("FOR");
  
    const data = {
        for: type,
        agent: "Credit / Debit Card",
        amount: rupee
    }
    axios
        .post("/api/users/walletOperations", { data })
        .then(response => {
            window.location.href = '/myWallet'
        })
        .catch(error => {
            console.log("error", error);
        });

    return (
            <div>
                PAYMENT_SUCCESSFULL
        </div>
        )
}
    
export default PaymentSuccess