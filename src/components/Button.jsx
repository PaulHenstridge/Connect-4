import { styled } from "styled-components";

const ButtonContainer = styled.div`
    
`

const Button = ({index, onColumnSelect}) => {
    return ( <ButtonContainer onClick={(index) => onColumnSelect(index)} >
    <h4>Col {index}</h4>
    </ButtonContainer> );
}
 
export default Button;