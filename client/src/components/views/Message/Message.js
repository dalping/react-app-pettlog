import axios from 'axios'
import { useSelector } from 'react-redux'
import React,{useState, useEffect} from 'react'
import './Message.css'
import {Spin,Checkbox} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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

    return (
        <div className="message">
            { Messages.length > 0 ? 
                <table className="messageTable">
                    <thead>
                        <tr>
                            <th><Checkbox onChange></Checkbox></th>
                            <th style={{width:'15%'}}>보낸사람</th>
                            <th>내용</th>
                            <th style={{width:'15%'}}>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   Messages &&
                        Messages.map((data,idx) => (
                            <tr key={idx}>
                                <td><Checkbox onChange={()=>{setSeletedMsg(SeletedMsg.concat(data._id))}}></Checkbox></td>
                                <td>{data.messageFrom}</td>
                                <td style={{cursor:'pointer', width:'50vw'}}>{data.message}</td>
                                <td>{data.createdAt.substring(0,10) +' '+ data.createdAt.substring(11,16)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            :<Spin indicator={antIcon} />
            }
        </div>
    )
}

export default Message
