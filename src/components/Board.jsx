import ColumnButtons from "./ColumnButtons";
import Row from "./Row";
import { styled } from "styled-components";


const BoardContainer = styled.div`
    width:80vw;

`

const Board = ({boardArr}) => {


    return (<BoardContainer>
        {boardArr.map((rowArr, idx) => <Row rowArr={rowArr} key={idx} />)}  
    </BoardContainer>
    )
}
 
export default Board;