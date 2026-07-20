import { Container, Content, HeaderLink, LinkContainer, Logout, Navigation, Options, Profile } from "./styles";
import { UserCircle, ShoppingCart } from "@phosphor-icons/react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";

export function Header() {
    const navigate = useNavigate();
    const { logout, userInfo} = useUser();

    const { pathname } = useResolvedPath()

    function logautUser() {
        logout();
        navigate('/login');
    }

    
  return (
    <Container>
        <Content>
        <Navigation>
            <div>
                <HeaderLink to="/" isActive={pathname === '/'}>Home</HeaderLink>
                <hr></hr>
                <HeaderLink to="/cardapio" isActive={pathname === '/cardapio'}>Cardapio</HeaderLink>
            </div>
        </Navigation>
        <Options>
            <Profile>
                <UserCircle color="${(props) => props.theme.white}" size={32} />
                <div>
                  <p>
                    Olá, <span>{userInfo.name}</span>
                  </p>
                <Logout onClick={logautUser}>Sair</Logout>
                </div>
            </Profile>
            <LinkContainer>
                <ShoppingCart color="${(props) => props.theme.white}" size={32} />
              <HeaderLink to="/carrinho">Carrinho</HeaderLink>
            </LinkContainer>
        </Options>
        </Content>
    </Container>
  );
}