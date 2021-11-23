import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    padding: 20px;
    padding-top:100px;
    display: flex;
    flex-direction: column;
    align-items: center;


    .btnArea{
        display: flex;
        gap: 8px;
        width: 60%;
        justify-content: end;
        margin-top: 10px;
        a{
            background-color: black;
            padding: 5px 20px;
            border-radius: 6px;
            color: white;
        }
    }
`;

export const MessageTable = styled.table`
    width: 60%;
    border-top: 1px solid black;
    border-bottom: 1px solid black;

    th{
        padding: 10px 0;
    }

    td{
        overflow: hidden;
        padding: 5px;
    }

    thead{
        border-bottom: 1px solid black;
    }

    .msgCheck{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .msgFrom{
        text-align: center;
        overflow: hidden;
        width: 10%;
    }
    .msgContent{
        width: 60%;
    }

    .msg{
        border-bottom: 1px solid #DFDFDF;

        &:last-child{
            border-bottom: 0;
        }
    }
`;