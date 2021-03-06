import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_5DWODAZ4Hx8ZRJMGo9nsm9GQ00Pdz17AB0');

function App() {
    const handleClick = async (event) => {
        // Call your backend to create the Checkout session.
        const { sessionId } = await fetchCheckoutSession();
        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
    };
    return (
        <button role="link" onClick={handleClick}>
            Checkout
    </button>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));