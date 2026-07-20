import { navLinks } from "./navLinks"
import Logo from "../../assets/logo.png"
import { SignOut } from "@phosphor-icons/react"
import { Container, Footer, NavLink, NavLinkContainer } from "./styles"
import { useUser } from "../../hooks/UserContext";
import { useResolvedPath } from "react-router-dom";

export function SidNavAdmin () {
    const { logout } = useUser();
    const { pathname } = useResolvedPath()

    return (
        <Container>
            <img src={Logo} alt="Hamburguer-logo-devburguer" />
            <NavLinkContainer>
                {navLinks.map (link => (
                    <NavLink 
                    key={link.id} 
                    to={link.path}
                    $isActive={pathname === link.path}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </NavLinkContainer>
            <Footer>
                <NavLink to={'/login'} onClick={logout}>
                    <SignOut />
                    <span>Sair</span>
                </NavLink>
            </Footer>
        </Container>
    )
}