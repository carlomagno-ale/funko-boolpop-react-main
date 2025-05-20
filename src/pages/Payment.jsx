import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '../components/smart/PaymentForm'
import { usePaymentContext } from '../contexts/paymentContext';
import Loader from '../components/dumb/Loader.ui';

export default function Payment() {

    const { payment } = usePaymentContext()

    const client_secret = payment.clientSecret
    const stripe_test_key = import.meta.env.VITE_STRIPE_TEST_KEY

    const options = {
        clientSecret: client_secret,
        appearance: {
            theme: 'minimal'
        }
    }


    const stripePromise = loadStripe(stripe_test_key);
    if (!client_secret) {
        console.error("Client secret is missing");
        return (
            <>
                <div className="container d-flex flex-column aling-items-center justify-content-center h-100 m-auto">
                    {/* loader nell'attesa della client secret  */}
                    <Loader />
                </div>
            </>

        )
    }

    switch (payment.state) {
        case 'loading':
            return (
                <>
                    <Loader />
                </>
            )
        case 'error':
            console.error('Payment Error:', payment.message);
            return (
                <>
                    <h1>{payment.state}</h1>
                    <p>{payment.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <Elements stripe={stripePromise} options={options}>
                        <PaymentForm clientSecret={client_secret} />
                    </Elements>
                </>
            )
    }
}