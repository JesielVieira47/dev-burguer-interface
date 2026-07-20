import styled from 'styled-components';
import Texture from '../../assets/texture.png';
import background from "../../assets/background.png";


export const Container = styled.div`
width: 100%;
background: linear-gradient(
        rgba(255,255,255,0.7),
        rgba(255,255,255,0.7)
    ),
    url('${background}');
min-height: 100vh;
`;

export const Banner = styled.div`
background: url(${Texture});
background-size: cover;
background-position: center;
background-color: ${(props) => props.theme.mainBlack};
display: flex;
justify-content: center;
align-items: center;
position: relative;

height: 200px;

img {
    height: 200px;
}
`;

export const Title = styled.div`
font-size: 32px;
font-weight: 800;
padding-bottom: 20px;
color: ${(props) => props.theme.gren};
text-align: center;
position: relative;

&::after {
    position: absolute;

    content: '';
    bottom: 0;
    left: calc(50% + -28px);
    width: 60px;
    height: 4px;
    background-color: ${(props) => props.theme.gren};
}
`;

export const Content = styled.div`
display: grid;
grid-template-columns: 1fr 30%;
width: 100%;
max-width: 1280px;
padding: 40px;
margin: 0 auto;
gap: 40px;
`;