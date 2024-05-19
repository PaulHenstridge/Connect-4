import { styled } from "styled-components";

const StyledButton = styled.button`
  background-color: #070727;
  color: white;
  padding: 4px 2px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 34px;

  &:hover {
    background-color: darkblue;
  }
`;


const Button = ({index, onColumnSelect}) => {
    return ( <StyledButton onClick={() => onColumnSelect(index)} >
    <h4>↓</h4>
    </StyledButton> );
}
 
export default Button;