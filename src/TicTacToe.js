import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import Status from "./components/Status"
import Board from "./components/Board"
import ResetButton from "./components/ResetButton"
import ToggleMode from "./components/ToggleModeButton/ToggleMode"

const TicTacToeGame = styled.div`

    display: flex;
    justify-content: center;
    padding: 2px;
    min-height: 100vh;
    box-sizing: border-box;
    background: ${(props)=> props.theme.background};

    .container{
        display: flex;
        flex-direction: column;
        & > * {
            margin-top: 10px
        }
    }

    .container2{
        display: flex;
        flex-direction: column;
        & > * {
            margin-top: 10px
        }
    }
`

const PLAYERS = [0,1]
const defaultPlayersMoveHistory = {
    [0]: [],
    [1]: []
}
const WIN_COMBINATIONS=[
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [2,4,6], [0,4,8]
]

function getRandomInt(max) {
    return Math.floor(Math.random() * (max));
  }

const TicTacToe = () => {
    const [currentPlayerId, setCurrentPlayerId] = useState(PLAYERS[0])
    const [playersMovesHistory, setPlayersMovesHistory] = useState(defaultPlayersMoveHistory)
    const [isSinglePlay, setIsSinglePlay] = useState(false)
    const [judgementInfo, setJudgementInfo] = useState({
        winnerId: -1,
        winningLines: [],
        lastStepsToWin: {}
    })
    const [isLoading, setIsLoading] = useState(false)

    const {winnerId, winningLines, lastStepsToWin} = judgementInfo
    const hasWinner = winnerId!== -1
    const isGameTied = PLAYERS.flatMap((playerId) => playersMovesHistory[playerId])
                              .length === 9 && !hasWinner;

    const handleReset = () => {
        setCurrentPlayerId(PLAYERS[0]);
        setPlayersMovesHistory(defaultPlayersMoveHistory);
        setJudgementInfo({winnerId: -1, winningLines: [], });
    }
    
    const handleSwitchMode = () => {setIsSinglePlay((prev)=> (!prev))}

    const getJudgement = (playersMovesHistory) => {
        const playerIds = Object.keys(playersMovesHistory).map((playerId)=>Number(playerId))
        let winnerId = -1, winningLines = [], lastStepsToWin = {...defaultPlayersMoveHistory};
        
        playerIds.forEach((playerId)=>{
            const userSteps = playersMovesHistory[playerId]
            const remainingStepsList = WIN_COMBINATIONS.map(
                (combination)=>(
                    combination.filter(
                        (step)=> userSteps.indexOf(step)===-1
                    )
                )
            )

            const foundWinner = remainingStepsList.filter(
                (steps, index)=> {

                    if(steps.length === 1){
                        lastStepsToWin[playerId] = [...lastStepsToWin[playerId], steps]
                    }
                    
                    if(steps.length === 0){
                        winningLines = [...winningLines, WIN_COMBINATIONS[index]]; 
                        return true
                    }
                    
                    return false
            }).length > 0

            if(foundWinner){winnerId = playerId}
        })
        return {winnerId, winningLines, lastStepsToWin}
    }

    const handleClickSquare = (squareId) => {
        if(isLoading){return}
        if(hasWinner || isGameTied){return}

        const isSquareEnable = playersMovesHistory[PLAYERS[0]].indexOf(squareId)===-1 
                            && playersMovesHistory[PLAYERS[1]].indexOf(squareId)===-1;
    
        if (isSquareEnable){
            const newPlayersMovesHistory = {
                ...playersMovesHistory, 
                [currentPlayerId]: [...playersMovesHistory[currentPlayerId], squareId]
            }
            
            setPlayersMovesHistory(newPlayersMovesHistory)
            setJudgementInfo(getJudgement(newPlayersMovesHistory))
            setCurrentPlayerId((prev) => (prev+1)%PLAYERS.length)
        }
    }
    
    const getIsBlockEnable = (blockId) => {
        const allDisabledBlocks = PLAYERS.flatMap( (playerId)=> playersMovesHistory[playerId])
        const indexOfBlockId = allDisabledBlocks.indexOf(blockId)
        const isBlockEnable = (indexOfBlockId === -1)
        
        return isBlockEnable
    }

    const selectBlockId = ({lastStepsToWin, getIsBlockEnable}) => {
        
        const allDisabledBlocks = PLAYERS.flatMap( (playerId)=> playersMovesHistory[playerId])

        const attackList = lastStepsToWin[1], protectList = lastStepsToWin[0];

        // this doesn't work,
        const stepsToAttack = attackList.flatMap(item => item).filter( (blockId)=> getIsBlockEnable(blockId))

        /* 
        this doesn't work, protectList is the list of squares where human player is one step away
        from victory. For example
          o | x | o
            | o |
            |   | x 
        protect list would be:
        [[1], [6], [8]]
        solution: add .flatMap before filter
        */
        const stepsToProtect = protectList.flatMap(item => item).filter( (blockId)=> getIsBlockEnable(blockId)) 

        if(stepsToAttack.length > 0){ return stepsToAttack[0]}
        if(stepsToProtect.length > 0){ return stepsToProtect[0]}

        for(let BlockId = 0; BlockId < 9; BlockId++){
            if(getIsBlockEnable(BlockId)){return BlockId}
        }
            
        return 0
    }

    useEffect( ()=>{
        if(isSinglePlay && currentPlayerId === 1 && !isGameTied){
            setIsLoading(true)
            const blockId = selectBlockId({lastStepsToWin, getIsBlockEnable})
            setTimeout( () => {
                setIsLoading(false)
                handleClickSquare(blockId)
            }, 1500)
        }
    }, [currentPlayerId, isSinglePlay]);

    const dbger = () => {
        //console.log("lastStepsToWin: ",lastStepsToWin)
        if(currentPlayerId===1){
            console.log(selectBlockId({lastStepsToWin, getIsBlockEnable}))
        }
    }

    useEffect(dbger, [currentPlayerId])

    return (
        <TicTacToeGame className="background">
            <div className="container">
                <Status 
                    currentPlayerId={currentPlayerId}
                    winnerId={winnerId}
                    isGameTied={isGameTied}
                />
                <Board
                    playersMovesHistory={playersMovesHistory}
                    winningSquares={winningLines.flatMap((squares)=>squares)}
                    handleClickSquare={handleClickSquare}
                />
                <div className="container2">
                    <ResetButton
                        onClick={handleReset}
                    />
                    <ToggleMode
                        isActive={isSinglePlay}
                        onClick={handleSwitchMode}
                        label="VS CPU"
                    />
                </div>
            </div>
        </TicTacToeGame>
    )
}

export default TicTacToe;