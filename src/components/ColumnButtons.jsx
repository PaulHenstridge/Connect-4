import Button from "./Button";
import { styled } from "styled-components";

const ButtonContainer = styled.div`
    display:flex;
    justify-content: space-evenly;
`
const ColumnButtons = ({boardArr, onColumnSelect}) => {
    return ( <ButtonContainer>
    {boardArr[0].map((column, index) => <Button key={index} index={index} onColumnSelect={onColumnSelect}/>)}
    </ButtonContainer> );
}
 
export default ColumnButtons;