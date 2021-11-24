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
    visibility: ${props => props.open ? 'visible' : 'hidden' };
    opacity: ${props => props.open ? '1' : '0' };
    transition: opacity 0.5s, width 0.5s, height 0.5s;
    span{
        cursor: pointer;
    }
`;