import styled from "styled-components";

import backgroundImage from "../../assets/background-login.jpg";

export const Container = styled.div`
    background: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100%;
    max-width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 80%;
    }
`;