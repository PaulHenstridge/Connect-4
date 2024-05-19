import Slot from "./Slot";
import { styled } from "styled-components";

const RowContainer = styled.div`
    display:flex;
    justify-content: space-evenly;
`

const Row = ({rowArr}) => {
    return ( <RowContainer>
    {rowArr.map(slotVal => <Slot value={slotVal} />)}
    </RowContainer> );
}
 
export default Row;