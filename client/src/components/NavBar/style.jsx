import styled from 'styled-components';

export const Menu = styled.div`
    position: fixed;
    z-index: 10;
    width: 100%;
    padding: 0 20px;
    /* border-bottom: solid 1px #e8e8e8; */
    overflow: auto;
    box-shadow: 0 0 20px #c2c2c2;
    background-color: #98ddca;
    display: flex;
    align-items: center;
    font-family: "NanumSquareRound";

    .openMenu{
        height: ${props => props.open ? '28vh' : '0'};
        visibility: ${props => props.open ? 'visible' : 'hidden'};
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: height 0.5s;
        animation: 0.5s ease-in-out loadEffect1;
    }
`;