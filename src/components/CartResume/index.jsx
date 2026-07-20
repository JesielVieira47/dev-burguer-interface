import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCart } from '../../hooks/CartContext';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';

import { Button } from "../Button";
import { Container } from "./styles";

export function CartResume() {
    const [finalPrice, setFinalPrice] = useState(0);
    const [deliveryTax] = useState(0);

    const navigate = useNavigate();

    // Importando cartProducts e clearCart corretamente
    const { cartProducts, clearCart } = useCart();

    useEffect(() => {
        const sumAllItems = cartProducts.reduce((acc, current) => {
            return current.price * current.quantity + acc;
        }, 0);
        setFinalPrice(sumAllItems);
    }, [cartProducts]);

    const submitOrder = async () => {
        // CORRIGIDO: Alterado de 'product' para 'products' (plural) para bater com o corpo da requisição
        const products = cartProducts.map((item) => {
            return { id: item.id, quantity: item.quantity, price: item.price };
        });
        try {
        const { data } = await api.post('./create-payment-intent', { products })

          navigate('/checkout', {
            state: data,
          })
        } catch (err) {
            toast.error('Erro, Tente novamente!', {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: false,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
        });
    }

    };

    return (
        <div>
            <Container>
                <div className="cointainer-top">
                    <h2 className="title">Resumo do Pedido</h2>
                    <p className="items">Itens</p>
                    <p className="items-price">{formatPrice(finalPrice)}</p>
                    <p className="delivery-tax">Taxa de Entrega</p>
                    <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
                </div>
                <div className="container-botton">
                    <p>Total</p>
                    <p>{formatPrice(finalPrice + deliveryTax)}</p>
                </div>
            </Container>
            <Button onClick={submitOrder}>Finalizar Pedido</Button>
        </div>    
    );
}