import PropTypes from "prop-types";
import { ContainerButton } from "./styles";

export function Button({ children, ...props }) {

    return <ContainerButton {...props}>{children}</ContainerButton>

    Button.prototype = { children: ProTypes.string, }
};