import React from 'react';
import styled from 'styled-components';
import ToggleModeButton from '.';

const Row = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
`
const Label = styled.span`
    margin-left: 8px;
    font-size: 20px;
    color: ${ (props) => props.theme.color};
`

const ToggleMode = ({label, isActive, onClick}) => {
    return (
        <Row>
            <ToggleModeButton   isActive={isActive}
                                onClick={onClick}/>
            <Label >{label}</Label>
        </Row>
    )
}

export default ToggleMode;