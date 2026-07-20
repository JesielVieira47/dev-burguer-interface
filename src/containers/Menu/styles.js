import styled from "styled-components";
import BannerHamburguer from "../../assets/banner-hamburguer.png";
import background from "../../assets/background.png";
import { Link } from "react-router-dom";


export const Container = styled.div`
width: 100%;
min-height: 100vh;
background-color: ${(props) => props.theme.secondWhite};

background: linear-gradient(
        rgba(255,255,255,0.7),
        rgba(255,255,255,0.7)
    ),
    url('${background}');
`

export const Banner = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 480px;
width: 100%;
position: relative;

background: url('${BannerHamburguer}') no-repeat;
background-color: ${(props) => props.theme.mainBlack};
background-position: center;
background-size: cover;

h1 {
    font-family: "Road Rage", sans-serif;
    font-size: 80px;
    line-height: 65px;
    position: absolute;
    color: ${(props) => props.theme.white};

    right: 20%;
    top: 30%;

span {
    display: block;
    color: ${(props) => props.theme.white};
    font-size: 20px;
}    
}
`

export const CategoryMenu = styled.div`

display: flex;
justify-content: center;
gap: 40px;
margin-top: 40px;
`

export const CategoryButton = styled(Link)`

text-decoration: none;
cursor: pointer;
background: none;
color: ${(props) => props.$isActiveCategory ? (props) => props.theme.purple : '#7f7f87'};
font-size: 25px;
font-weight: 500;
padding-bottom: 5px;
line-height: 20px;
border: none;
border-bottom: ${(props) => props.$isActiveCategory &&  '3px solid ${(props) => props.theme.purple}'};
`

export const ProductsContainer = styled.div`

display: grid;
grid-template-columns: repeat(3, 1fr);
padding: 40px;
gap: 60px;
justify-content: center;
max-width: 1280px;
margin: 50px auto;
`

