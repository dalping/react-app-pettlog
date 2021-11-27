import styled from "styled-components";

export const PostWrapper = styled.div`
    display: flex;
    width: 80%;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 5px;
    font-family: "NEXON Lv2 Gothic";
    position: relative;
    `;

export const PostContent = styled.div`
    display: flex;
    border-bottom: 1px solid black;
    overflow: hidden;

    @media screen and (max-width: 768px) { 
        flex-direction: column;
    }
`;

export const PostPhoto = styled.div`
    width: 100%;
    background-color: #98ddca;
    max-height: 350px;
    overflow: hidden;

    .photo{
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
    }
`;

export const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1em;
    position: relative;
    min-height: 200px; 

    .contentHeader{
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(223, 223, 223);
        margin-bottom: 10px;
        padding-bottom: 5px;

        .profileImg{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .contentBody {
        text-align: justify;
        overflow: scroll;
        font-size: 1rem;
    }

    .postDate {
        position: absolute;
        bottom: 10px;
        right: 10px;
        text-align: right;
        color: gray;
        font-size: 0.9rem;
    }
`;


export const PostOption = styled.div`
    display: flex;
    height: 60px;
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
`;

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

export const CarouselWrapper = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;

    .innerDiv{
        flex:0 0 100%;
        //width: 0 0100%;
        height: 100%;
        
        img{
            width: 100%;
            height: 100%;
            transition: transform 0.5s;
            transform: translateX(${props => props.Xpos+'%'});
            cursor: pointer;
        }
    }

`;

export const CarouselBtns = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    justify-content: space-between;
    font-size: 1.7rem;
    color: white;
    
    .btn{
        z-index:1;
        transition: transform 0.3s;
        cursor: pointer;
        margin: 5px;

        &:hover{
            transform: scale(1.2);
        }
    
    }
`;