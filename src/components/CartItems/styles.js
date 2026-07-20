import styled from 'styled-components';

export const ProductImage = styled.img`
height: 80px;
width: 80px;
border-radius: 16px;
`

export const ButtonGroup = styled.div`
display: flex;
align-items: center;
gap: 12px;

button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    color: ${(props) => props.theme.white};
    border-radius: 4px;
    background-color: ${(props) => props.theme.purple};
    transition: all 0.2s ease-in-out;
    border: none;

    &:hover {
        background-color: ${(props) => props.theme.secondDarkPurple};
    }
}
`

export const EmptyCart = styled.div`
font-size: 20px;
text-align: center;
font-weight: bold;
`

export const ProductTotlePrice = styled.div`
font-weight: bold;
`

export const TrashImage = styled.img`
height: 20px;
width: 20px;
cursor: pointer;
`