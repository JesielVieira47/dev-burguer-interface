import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css";
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export function CheckoutForm() {
    const { cartProducts, clearCart } = useCart();
    
    // CORRIGIDO: Agora o hook está sendo executado corretamente com ()
    const navigate = useNavigate(); 
  
    const stripe = useStripe();
    const elements = useElements();
    const { state } = useLocation();
    
    // Evita que quebre caso o state venha nulo de alguma outra tela
    const dpmCheckerLink = state?.dpmCheckerLink; 

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error("Stripe ou Elements com falhas, tente novamente!");
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
            toast.error(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                const products = cartProducts.map((item) => {
                    return { id: item.id, quantity: item.quantity, price: item.price };
                });

                const { status } = await api.post(
                    '/orders', 
                    { products }, 
                    { validataStatus: () => true }
                );

                if (status === 200 || status === 201) {
                    setTimeout(() => {
                        // Usando a rota correta que você definiu no preenchimento da URL
                        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
                    }, 2000);
                    clearCart();
                    toast.success('Pedido Realizado com Sucesso!');
                } else if (status === 409) {
                    toast.error('Falha ao Realizar seu Pedido (Conflito)');
                } else {
                    throw new Error();
                }
            } catch (error) {
                toast.error("Falha no sistema! Tente novamente mais tarde.");
            }
        } else {
            // Caso caia em outro status de redirecionamento do Stripe
            navigate(`/complete?payment_intent_client_secret=${paymentIntent?.client_secret}`);
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    };

    return (
        <div className="container">
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar agora"}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}