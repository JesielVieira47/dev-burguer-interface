import styled from "styled-components";

export const Container = styled.div`
    background-color: ${(props) => props.theme.darkPurple};
    height: 50px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        color: ${(props) => props.theme.white};
        font-size: 14px;
        font-weight: light;
    }
`