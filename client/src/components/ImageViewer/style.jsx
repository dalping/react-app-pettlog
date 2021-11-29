import styled from "styled-components";

export const ViewerWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 2080;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: rgba(0,0,0,0.8);

    .closeBtn{
        position: absolute;
        z-index: 2081;
        color: white;
        transition: transform 0.3s;
        font-size: 2rem;
        top: 10px;
        right: 10px;
        cursor: pointer;

        &:hover{
            transform: scale(1.2);
        }
    }
`;

export const CarouselBtns = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    justify-content: space-between;
    font-size: 3rem;
    color: white;
    
    .btn{
        z-index:1;
        transition: transform 0.3s;
        cursor: pointer;
        margin: 10px;

        &:hover{
            transform: scale(1.2);
        }
    
    }
`;

export const Viewer = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    max-width: 90vw;
    //background-color: black;
    overflow: hidden;

    img{
        height: 100%;
    }
`;