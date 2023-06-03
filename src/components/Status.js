import React from 'react';
import Chess from "../components/Chess"
import styled from "styled-components"

/*when using styled, ';' is very important*/
const StatusContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 80px;
    border-radius: 12px;
    background: #FFFFFF;
    .information__chess{ width: 48px ;}
`;

const Text = styled.div`
    margin-right: 20px;
    font-family: "Noto Sans TC", sans-serif;
    font-weight: 700;
    font-size: 32px;
    white-space: nowrap;
`


const Status = ({currentPlayerId, winnerId, isGameTied}) => {
    
    const makeContent = () => {
        const hasWinner = winnerId !== -1
        if(isGameTied){ return <Text>Tie</Text>}
        if(!hasWinner){ 
            return (
            <React.Fragment>
                <Text>Turn: </Text>
                <Chess playerId={currentPlayerId} className="information__chess" />
            </React.Fragment>)
        }
        return (
            <React.Fragment>
                <Chess playerId={winnerId} className="information__chess"/>
                <Text> Wins!</Text> 
            </React.Fragment>
        )
    }
    
    return(
        <StatusContainer >
            {makeContent()}
        </StatusContainer>
    )
    
}

export default Status