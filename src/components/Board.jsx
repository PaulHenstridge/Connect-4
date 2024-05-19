import Row from "./Row";


const Board = ({boardArr}) => {

    // for (let row in boardArr){
    //     for(let slot in row){
            
    //     }
    // }

    return (<>
    {boardArr.map(rowArr => <Row rowArr={rowArr} />)}  
    </>
    )
}
 
export default Board;