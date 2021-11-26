import styled from "styled-components";

export const Popover = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: white;
    padding: 10px;
    gap:10px;
    border: 1px solid black;
    border-radius: 5px;
    margin-top:5px;
    overflow: hidden;
    //width: ${props => props.open ? 'auto' : '0px' };
    //height: ${props => props.open ? 'auto' : '0px' };
    //opacity: ${props => props.open ? '1' : '0' };
    //transform: ${props => props.open ? 'scale(1.0)' : 'scale(0)' };
    //transition: all 0.5s, width 0.5s, height 0.5s, opacity 0.5s, transform 0.5s;

    span{
        cursor: pointer;
    }
`;