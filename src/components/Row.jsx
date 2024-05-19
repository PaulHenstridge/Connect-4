import Slot from "./Slot";
import { styled } from "styled-components";

const rowContainer = styled.div`
    display:flex;
`

const Row = ({rowArr}) => {
    return ( <>
    {rowArr.map(slotVal => <Slot value={slotVal} />)}
    </> );
}
 
export default Row;