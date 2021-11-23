import axios from 'axios'
import { useSelector } from 'react-redux'
import React,{useState, useEffect} from 'react'
import {Spin,Checkbox,message} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as Styled from './style';

function Message() {

    const [Messages, setMessages] = useState([])
    const [SeletedMsg, setSeletedMsg] = useState([])
    const user = useSelector(state => state.user_reducer)

    useEffect(() => {

        if(!user.userData) return

        axios.post('/api/message/getMessage',{messageTo:user.userData._id})
        .then(res=>{
            if(res.data.success){
                //console.log(res.data.msg)
                setMessages(res.data.msg)
            }else{
                console.log('메세지를 불러오지 못했습니다.')
            }
        })
    }, [user])

    useEffect(() => {
        console.log(SeletedMsg)
    }, [SeletedMsg])

    const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

    const setCheckAll = (e) => {
        if(e.target.checked){
            setSeletedMsg(Messages.map(m=> m._id));
        }else{
            setSeletedMsg([]);
        }
    }

    const setCheckMsg = (data, e) => {
        if(SeletedMsg.indexOf(data._id) === -1){
            setSeletedMsg(SeletedMsg.concat(data._id));
        }
        else{
            const arr = SeletedMsg.filter( a => a !== data._id);
            setSeletedMsg(arr)
        }


        // if(!(data._id in SeletedMsg)){
        //     setSeletedMsg(SeletedMsg.concat(data._id));
        // }else{
        
        // }
    }

    const deleteMSG = () => {
        if(SeletedMsg.length === 0){
            message.error("삭제하실 쪽지를 선택하세요");
            return
        }
    }

    const sendReplyMSG = () => {

        if(SeletedMsg.length === 0){
            message.error("답장하실 쪽지를 선택하세요");
            return
        }

        if(SeletedMsg.length > 1){
            message.error("1개의 쪽지를 선택해 주세요");
            return
        }
    }

    return (
        <Styled.Container>
            <h2>Message</h2>
            { Messages? 
                <Styled.MessageTable className="messageTable">
                    <thead>
                        <tr>
                            <th><Checkbox onChange={setCheckAll}></Checkbox></th>
                            <th>보낸사람</th>
                            <th>내용</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   Messages &&
                        Messages.map((data,idx) => (
                            <tr key={idx} className="msg">
                                <td className="msgCheck">
                                    <Checkbox 
                                        onChange={ e =>{setCheckMsg(data, e)}} 
                                        checked={SeletedMsg.indexOf(data._id) !== -1 ? true : false}/>
                                </td>
                                <td className="msgFrom">{data.messageFrom.name}</td>
                                <td className="msgContent">{data.message}</td>
                                <td>{data.createdAt.substring(0,10) +' '+ data.createdAt.substring(11,16)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Styled.MessageTable>
            :<Spin indicator={antIcon} />
            }
            <div className="btnArea">
                <a onClick={sendReplyMSG}>답장</a>
                <a onClick={deleteMSG}>삭제</a>
            </div>
        </Styled.Container>
    )
}

export default Message
