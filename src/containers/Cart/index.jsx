import Logo from '../../assets/logo.png'
import { CartItems, CartResume } from '../../components';
import { Container, Banner, Title, Content } from './styles';

export function Cart() {
        return (
            <Container>
                <Banner>
                    <img src={Logo} alt="Logo" />
                </Banner>
                <Title>Chueckout - Pedidos</Title>
                <Content>
                    <CartItems />
                    <CartResume />
                </Content>
            </Container>
        );
}