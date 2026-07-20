import React from "react";
import { Container } from "./styles";
import LogoImage from "../../assets/logo.png"; // Verifique se o caminho da imagem está correto

export function LeftContainer() {
    return (
        <Container>
            <img src={LogoImage} alt="logo-dev-burguer" />
        </Container>
    );
};