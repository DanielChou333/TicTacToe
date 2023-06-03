import React from 'react';
import styled from 'styled-components';
import {PAGE_PADDING, MAX_CONTENT_WIDTH} from "../../constants"
import Square from './Square'

const GridContainer = styled("div")`
    width: min( 
        calc(100vw - ${PAGE_PADDING * 2}px),
        ${MAX_CONTENT_WIDTH - (PAGE_PADDING * 2)}px
    );
    height: min(
        calc(100vw - ${PAGE_PADDING * 2}px),
        ${MAX_CONTENT_WIDTH - (PAGE_PADDING * 2)}px
    );

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 12px;
`;

const squareIds = new Array(9).fill(-1).map((_,index) => index)

const Board = ({winningSquares, playersMovesHistory, handleClickSquare}) => {
    
    const playerIds = Object.keys(playersMovesHistory)
    
    const getPlayerId = (squareId) => {
        let foundPlayerId = -1;
        playerIds.forEach((playerId) => {
            const steps = playersMovesHistory[playerId];
            if(steps.indexOf(squareId)>-1){foundPlayerId = Number(playerId)}
        });
        return foundPlayerId;
    };

    return(
        <GridContainer className="Board">
            {
                squareIds.map((squareId)=>(
                    <Square 
                        key={squareId} 
                        isWinnerStep={winningSquares.indexOf(squareId) > -1} 
                        onClick={()=>handleClickSquare(squareId)}
                        playerId={getPlayerId(squareId)}    
                    />
                ))
            }
        </GridContainer>
    )
    
}

export default Board