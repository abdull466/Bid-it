import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import setAuthToken from "../../utils/setAuthToken";
import * as RBS from 'react-bootstrap'
import Divider from '@material-ui/core/Divider';
// import StripeCheckout from "react-stripe-checkout";
import $ from 'jquery'
import { toast } from "react-toastify";
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import swal from 'sweetalert'
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

toast.configure()
var rupee = ""
var title = ""
var desc = "Description Here"
var prps = ""
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});



const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    X
        </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);




export default function CustomizedDialogs(props) {

    setAuthToken(localStorage.getItem('token'));
    if (!localStorage.token) {
        window.location.href = "/";
    }

    const handleClick = async (event) => {
        var bal = localStorage.getItem('currBal')
        // Call your backend to create the Checkout session.
        const data = {
            pkr: document.getElementById("Amount3").value,
            for: localStorage.getItem('payType')
        }
        if (data.pkr <= 1000) {
            swal(props.name + " Info!", "Please enter amount greater than 1000 ", "info");
        }
        else if (props.name !== "Recharge" && data.pkr > parseFloat(bal)) {
            swal(props.name + " Failed!", "You dont have enough balance to " + props.name, "error");
        }

        else {
            await axios.post('api/users/stripeSession', data)
                .then(response => {
                    // alert("ENTERED")
                    const sessId = response.data;
                    const stripe = window.Stripe("pk_test_5DWODAZ4Hx8ZRJMGo9nsm9GQ00Pdz17AB0");
                    const { error } = stripe.redirectToCheckout({
                        sessionId: sessId.id
                    });
                })
                .catch(error => {
                    console.log("error", error);
                });
        };
    }

    prps = props.name
    localStorage.setItem('payType', prps)

    async function handleToken(token, addresses) {
        const product = {
            name: title,
            price: rupee,
            description: desc
        };
        const response = await axios.post(
            "https://opn6p.sse.codesandbox.io/checkout",
            { token, product }
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
            setTimeout(function () {
                toast("Success! Check email for details", { type: "success" });
                setTimeout(function () {
                    window.location.reload()
                }, 2000);
            }, 3000);
        } else {
            setTimeout(function () {
                toast("Something went wrong", { type: "error" });
                setTimeout(function () {
                    window.location.reload()
                }, 2500);
            }, 2000);
        }
        setTimeout(function () {
            toast("Success! Check email for details", { type: "success" });
            setTimeout(function () {
                const data = {
                    for: props.name,
                    agent: "Debit/Credit Card",
                    amount: rupee
                }
                axios
                    .post("/api/users/walletOperations", { data })
                    .then(response => {

                    })
                    .catch(error => {
                        console.log("error", error);
                    });
                window.location.reload()
            }, 2000);
        }, 2000);
        document.getElementById('pagNav').hidden = false
    }


    function onJazzCashPayment() {

        var tel = document.getElementById('phoneNumber').value;
        var pkr = document.getElementById('Amount').value;
        var bal = localStorage.getItem('currBal')

        if (props.name !== "Recharge" && pkr > parseFloat(bal)) {
            swal(props.name + " Failed!", "You dont have enough balance to " + props.name, "error");
        }
        else {


            if (tel === "" || tel === null) {
                document.getElementById('phoneNumber').style.borderColor = 'red'
                document.getElementById('numError').innerText = "* Required"
            }
            else if (pkr === "" || pkr === null) {
                document.getElementById('Amount').style.borderColor = 'red'
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
                setTimeout(function () {
                    toast("Success! Check Phone for details", { type: "success" });
                    setTimeout(function () {
                        const data = {
                            for: props.name,
                            agent: "JazzCash",
                            amount: pkr
                        }


                        axios
                            .post("/api/users/walletOperations", { data })
                            .then(response => {
                            })
                            .catch(error => {
                                console.log("error", error);
                            });
                        window.location.reload()
                    }, 2000);
                }, 3000);
            }
            else {
                document.getElementById('numError').innerText = "Should be Valid Number"
            }
        }
    }

    function onEasyPaisaPayment() {
        var tel = document.getElementById('phoneNumber2').value;
        var pkr2 = document.getElementById('Amount2').value;

        if (props.name !== "Recharge" && pkr2 > localStorage.getItem('currBal')) {
            swal(props.name + " Failed!", "You dont have enough balance to " + props.name, "error");
        }
        else {

            if (tel === "" || tel === null) {
                document.getElementById('phoneNumber2').style.borderColor = 'red'
                document.getElementById('numError2').innerText = "* Required"
            }
            else if (pkr2 === "" || pkr2 === null) {
                document.getElementById('Amount2').style.borderColor = 'red'
                document.getElementById('numError').innerText = "* Required"
            }
            else if (tel.length < 11) {
                document.getElementById('numError2').innerText = "Should be 11 digits"
            }
            else if ($("#phoneNumber2").val().charAt(0) === '0' &&
                $("#phoneNumber2").val().charAt(1) === '3'
            ) {
                document.getElementById('easypaisaLoading').hidden = false
                document.getElementById('easypaisaPane').hidden = true
                setTimeout(function () {
                    toast("Success! Check Phone for details", { type: "success" });
                    setTimeout(function () {
                        const data = {
                            for: props.name,
                            agent: "EasyPaisa",
                            amount: pkr2
                        }
                        axios
                            .post("/api/users/walletOperations", { data })
                            .then(response => {
                                // adData = response.data.allResult;
                                // imags = response.data.allResult.image
                                // bdl = response.data.bidsL;
                                // console.log("Data", adData);
                            })
                            .catch(error => {
                                console.log("error", error);
                            });
                        window.location.reload()
                    }, 2000);
                }, 3000);


            }
            else {
                document.getElementById('numError2').innerText = "Should be Valid Number"
            }
        }
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block' onClick={handleClickOpen}>
                {props.name}
            </button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    E-Wallet {props.name}
                </DialogTitle>
                <DialogContent dividers>
                    <RBS.Modal.Dialog >
                        <RBS.Modal.Header >


                            <h4 style={{ marginLeft: '50px' }}> Choose Your {props.name} Method   </h4>
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

                                            {/* <br></br>
                                            <RBS.Nav.Item>
                                                <Divider />
                                                <RBS.Nav.Link eventKey="forth">
                                                    <img src={"https://mehmart.com/wp-content/uploads/2019/09/cod.png"} />
                                                </RBS.Nav.Link>
                                                <Divider />
                                            </RBS.Nav.Item> */}
                                            {/* 
                                            <br></br>
                                            <RBS.Nav.Item>
                                                <Divider />
                                                <RBS.Nav.Link eventKey="fifth">
                                                    <img src={"https://cdn2.iconfinder.com/data/icons/fintech-butterscotch-vol-2/512/Wallet-512.png"} />
                                                </RBS.Nav.Link>
                                                <Divider />
                                            </RBS.Nav.Item> */}

                                        </RBS.Nav>

                                    </RBS.Col>
                                    <RBS.Col sm={10}>
                                        <RBS.Tab.Content>

                                            <RBS.Tab.Pane eventKey="first" >
                                                <img id="jazzcashLoading" src={"https://developertest.jazzcash.com.pk/store/site/themes/wso2/images/loader.gif"} hidden={true} />
                                                <div id="jazzcashPane" style={{ 'text-align': 'center' }}>
                                                    <img width="100px" src={"https://nayatel.com/wp-content/uploads/2018/11/jazzcash-logo-200x200.png"} />
                                                    <br></br>
                                                    ACT#:

                                                    <input id="phoneNumber" maxLength={11} onKeyUp={() => { validateNumber() }} placeholder="e.g 03077211556" required={true} />
                                                    <br></br>
                                                    PKR : <input id="Amount" maxLength={7} placeholder="e.g 9000" required={true} />
                                                    <br></br>
                                                    <span id="numError"></span>
                                                    <br></br>       <br></br>
                                                    <div style={{ marginLeft: '130px' }}><button onClick={() => { onJazzCashPayment() }} className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'><b>{props.name} Now</b></button>
                                                    </div>
                                                </div>
                                            </RBS.Tab.Pane>

                                            <RBS.Tab.Pane eventKey="second">
                                                <br></br>
                                                <img id="easypaisaLoading" src={"https://developertest.jazzcash.com.pk/store/site/themes/wso2/images/loader.gif"} hidden={true} />
                                                <div id="easypaisaPane" style={{ 'text-align': 'center' }}>
                                                    <img width="170px" src={"https://easypaisa.com.pk/wp-content/uploads/2019/10/Header-Icon.png"} />
                                                    <br></br>  <br></br>
                                                    ACT#:
                                                    <input id="phoneNumber2" maxLength={11} onKeyUp={() => { validateNumber2() }} placeholder="e.g 03077211556" />
                                                    <br></br>
                                                    PKR : <input id="Amount2" maxLength={7} placeholder="e.g 9000" required={true} />
                                                    <br></br>
                                                    <span id="numError2"></span>
                                                    <br></br>      <br></br>
                                                    <div style={{ marginLeft: '130px' }}> <button onClick={() => { onEasyPaisaPayment() }} className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'><b>{props.name} Now</b></button>
                                                    </div></div>
                                            </RBS.Tab.Pane>
                                            <RBS.Tab.Pane eventKey="third">
                                                <br></br><br></br><br></br>
                                                {/*                                                
                                                <StripeCheckout
                                                    style={{ marginLeft: '80px' }}
                                                    stripeKey="pk_test_5DWODAZ4Hx8ZRJMGo9nsm9GQ00Pdz17AB0"
                                                    token={handleToken}
                                                    amount={rupee}
                                                    name={title}
                                                /> */}

                                                PKR : <input id="Amount3" maxLength={7} placeholder="e.g 9000" required={true} />
                                                <button role="link" onClick={handleClick}>
                                                    Checkout
                                                </button>

                                            </RBS.Tab.Pane>
                                            {/* <RBS.Tab.Pane eventKey="forth">
                                                <img id="codLoading" src={"https://developertest.jazzcash.com.pk/store/site/themes/wso2/images/loader.gif"} hidden={true} />
                                                <div id="codPane" style={{ 'text-align': 'center' }}>
                                                    <img width="200px" src={" https://cdn.iconscout.com/icon/free/png-512/cash-on-delivery-1851572-1569297.png"} />
                                                    <br></br><br></br>
                                                    <div style={{ marginLeft: '100px' }}>  <button onClick={() => { oncodPayment() }} className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'><b>Confirm Paymenet</b></button>
                                                    </div> </div>

                                            </RBS.Tab.Pane> */}

                                            {/* <RBS.Tab.Pane eventKey="fifth">
                                                <img id="ewalletLoading" src={"https://developertest.jazzcash.com.pk/store/site/themes/wso2/images/loader.gif"} hidden={true} />
                                                <div id="ewalletPane" style={{ 'text-align': 'center' }}>
                                                    <img width="250px" src={"https://peerbits-wpengine.netdna-ssl.com/wp-content/uploads/2019/11/digital-wallet-payment-be-the-leaders.png"} />
                                                    <br></br><br></br>
                                                    <div style={{ marginLeft: '100px' }}>  <button onClick={() => { onewalletPayment() }} className='rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2  d-none d-md-block'><b>Pay from Wallet</b></button>
                                                    </div> </div>

                                            </RBS.Tab.Pane> */}

                                        </RBS.Tab.Content>
                                    </RBS.Col>
                                </RBS.Row>
                            </RBS.Tab.Container>
                        </RBS.Modal.Body>

                        <RBS.Modal.Footer>


                        </RBS.Modal.Footer>
                    </RBS.Modal.Dialog>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </div>
    );
}