import React, { useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ShopContext } from "../../context/shop-context";
import axios from "axios";
import './payment.css';

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
};

const cardIcons = {
    visa: "/visa.png", 
    mastercard: "/mastercard.png",
    
};

export default function PaymentForm() {
    const context = useContext(ShopContext);
    const [success, setSucces] = useState(false);
    const [isCardFilled, setIsCardFilled] = useState(false);
    const [cardHolderName, setCardHolderName] = useState("");
    const [last4, setLast4] = useState("");
    const [cardType, setCardType] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const { card } = paymentMethod;
            setLast4(card.last4);
            setCardType(card.brand);

            try {
                const {id} = paymentMethod;
                const response = await axios.post("http://localhost:3001/payment", {
                    amount: context.payAumount,
                    id
                });

                if (response.data.success) {
                    console.log("successful payment");
                    setSucces(true);
                }
            } catch (error) {
                console.log("error", error);
            }
        } else {
            console.log(error.message);
        }
    };

    const handleCardChange = (event) => {
        if (event.complete) {
            setIsCardFilled(true);
        } else {
            setIsCardFilled(false);
        }
    };

    return (
        <>
            {!success ? (
                <div className="payment-form-container">
                    <form onSubmit={handleSubmit} className="payment-form">
                        <div className={`card-container ${isCardFilled ? 'filled' : ''}`}>
                            <div className="card-front">
                                <div className="card-number">
                                    {isCardFilled ? `**** **** **** ${last4}` : "**** **** **** ****"}
                                </div>
                                <div className="card-holder">
                                    {cardHolderName || "Cardholder Name"}
                                </div>
                                <div className="card-type">
                                    {/* Mostrar el ícono de la tarjeta */}
                                    {cardType && (
                                        <img
                                            src={cardIcons[cardType.toLowerCase()]}
                                            alt={cardType}
                                            className="card-icon"
                                            style={{ width: "60px"}}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <fieldset className="FormGroup">
                            <div className="FormRow">
                                <input
                                    type="text"
                                    placeholder="Cardholder Name"
                                    value={cardHolderName}
                                    onChange={(e) => setCardHolderName(e.target.value)}
                                    className="card-holder-input"
                                />
                            </div>
                            <div className="FormRow">
                                <CardElement
                                    options={CARD_OPTIONS}
                                    onChange={handleCardChange}
                                />
                            </div>
                        </fieldset>
                        <button className="pay">Pay</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>Successful purchase</h2>
                </div>
            )}
        </>
    );
}