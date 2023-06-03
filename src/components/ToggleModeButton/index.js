import React from 'react';
import styled, {css} from "styled-components"

const BUTTON_HEIGHT = 40

const activeThumbStyle = css`
    left: ${BUTTON_HEIGHT}px;
`
const activeButtonStyle = css`
    background: ${ (props) => props.theme.toggleButton.on};
`

const StyledToggleButton = styled.div`
    position:       relative;
    height:         ${BUTTON_HEIGHT}px;
    width:          ${BUTTON_HEIGHT*2}px;
    border:         2px solid #FFF;
    border-radius:  50px;
    cursor:         pointer;
    background:     ${ (props) => props.theme.toggleButton.off};
    transition:     all 0.2s ease-in-out;
    box-shadow:     inset -4px -4px 12px 0px rgb(0 0 0 / 20%);
    ${ ({ $isActive}) => $isActive && activeButtonStyle};

    .switch-button__thumb{
        position:       absolute;
        height:         ${BUTTON_HEIGHT}px;
        width:          ${BUTTON_HEIGHT}px;
        border-radius:  50%;
        background:     #FFF;
        transition:     all 0.2s ease-in-out;
        left:           0px;
        display:        flex;
        align-items:    center;
        justify-content:center;
        box-shadow:     inset -4px -4px 12px 0px rgb(0 0 0 / 20%);
        ${({$isActive})=> $isActive && activeThumbStyle};
    }
`


const ToggleModeButton = ({isActive, onClick}) => {
    return(
        <StyledToggleButton className="ToggleModeButton"
                            $isActive={isActive}
                            onClick={onClick}
                                
        >
            <div className='switch-button__thumb'>
                <span>{isActive? "ON" : "OFF"}</span>
            </div>
        </StyledToggleButton>
    )
    
}

export default ToggleModeButton