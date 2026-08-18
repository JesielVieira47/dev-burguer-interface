import styled from "styled-components";

export const ContainerButton = styled.button`
  background-color: ${(props) => props.theme.purple};
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 6px;
  font-size: 27px;
  color: ${(props) => props.theme.white};
  cursor: pointer; /* Boa prática para mostrar a "mãozinha" no clique */

  /* Transforma o botão em um container Flexbox */
  display: flex;
  align-items: center;     /* Alinha o ícone verticalmente no centro */
  justify-content: center; /* Alinha o ícone horizontalmente no centro */

  transition: background-color 0.2s ease-in-out; /* Deixa o hover mais suave */

  &:hover {
    background-color: ${(props) => props.theme.secondDarkPurple};
  }

  img {
    /* Não precisa de mais nada aqui dentro! */
    /* O Flexbox do pai já faz todo o trabalho de centralizar */
    width: 24px; /* Ajuste o tamanho do ícone se achar necessário */
    height: 24px;
  }
`;