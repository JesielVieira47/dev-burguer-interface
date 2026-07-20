import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container, Title } from './styles';

import CarouselComponent from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CardProduct } from '../CardProduct';
import { formatPrice } from '../../utils/formatPrice';

const Carousel = CarouselComponent.default ? CarouselComponent.default : CarouselComponent;

export function OffersCarousel() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {

        async function loadProducts() {
            const { dat } = await api.get('/products')

            const onlyOffers = data.filter(product => product.offer === true)
                .map((product) => ({
                    currencyValue: formatPrice(product.price),
                    ...product
                }));

            setOffers(onlyOffers);
        }

        loadProducts();
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1080 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 690 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 690, min: 0 },
            items: 2,
        },
    };

    return (
        <Container>
            <Title>Ofertas do Dia</Title>

            <Carousel
                responsive={responsive}
                infinite={true}
                partialVisbile={false}
                itemClass="carousel-item"
            >
                {offers.map(product => (
                    <CardProduct key={product.id} product={product} />
                ))}
            </Carousel>
        </Container>
    )
}