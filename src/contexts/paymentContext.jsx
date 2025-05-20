import { createContext, useContext, useState, useEffect } from "react";

const PaymentContext = createContext()

function PaymentProvider({ children }) {

    const [payment, setPayment] = useState({
        state: 'loading',
    })

    useEffect(() => {
        const clientSecretRecover = sessionStorage.getItem('clientSecret')

        if (clientSecretRecover) {
            setPayment({
                state: 'success',
                clientSecret: clientSecretRecover
            })
        } else {
            // Puoi gestire il caso in cui non troviamo un clientSecret
            setPayment({
                state: 'error',
                message: 'No client secret found in session storage.',
            });
        }
    }, [])

    function paymentIntent(form) {


        fetch('http://localhost:3000/api/v1/transactions', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                sessionStorage.setItem('clientSecret', data.clientSecret)
                if (data.clientSecret) {
                    setPayment({
                        state: 'success',
                        clientSecret: data.clientSecret
                    })
                } else {
                    setPayment({
                        state: data.state,
                        message: data.message
                    })
                }


            })
            .catch(err => {
                console.error(err)
                setPayment({
                    state: 'error',
                    message: err.message
                })
            })
    }

    return (
        <>
            <PaymentContext.Provider value={{ paymentIntent, payment }}>
                {children}
            </PaymentContext.Provider>
        </>
    )
}

function usePaymentContext() {
    const context = useContext(PaymentContext)
    return context
}

export { PaymentProvider, usePaymentContext }