import React from 'react';
import styled from "styled-components"

const StyledResetButton = styled.div`
    font-family: "Black Han Sans", sans-serif;
    font-size: 28px;
    box-shadow: inset -4px -4px 12px 0px rgb(0 0 0 / 20%);
    background: ${ (props)=> props.theme.resetButton.normal};
    &:hover{ background: ${ (props)=> props.theme.resetButton.hover}};
    &:active{ background: ${ (props)=> props.theme.resetButton.active}};
    color: ${ (props)=>props.theme.color};
    border-radius: 50px;
    height: 56px;
    text-align: center;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const ResetButton = ({onClick}) => {
    return(
        <StyledResetButton className="ResetButton" onClick={onClick}>
            <span>Reset</span>
        </StyledResetButton>
    )
    
}

export default ResetButton