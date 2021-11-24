import axios from 'axios'
import { useSelector } from 'react-redux'
import React,{useState, useEffect} from 'react'
import {Spin,Checkbox,message, Modal, Input} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as Styled from './style';
import Writer from '../Post/Writer';

function Message() {

    const [Message, setMessage] = useState('')
    const [Messages, setMessages] = useState([])
    const [SeletedMsg, setSeletedMsg] = useState([])
    const user = useSelector(state => state.user_reducer)
    const [OpenDeleteModal, setOpenDeleteModal] = useState(false)
    const [ModalVisible, setModalVisible] = useState(false)

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

    // Delete Post
    const deleteMSGHandler = () => {

        setOpenDeleteModal(!OpenDeleteModal);
        
        const promises = SeletedMsg.map(msg =>
            axios.post('/api/message/deleteMessage',{_id : msg})
        );

        Promise.all(promises).then( () => {

            const copyArr = [...Messages];

            for(let i=0; SeletedMsg.length > i ; i++){
                const idx = copyArr.findIndex( msg => msg._id === SeletedMsg[i]);
                copyArr.splice(idx, 1);
            }

            setSeletedMsg([]);
            setMessages(copyArr);
        });
    };

    const sendMessageHandler = () => {

        const idx = Messages.findIndex( msg => msg._id === SeletedMsg[0]);

        const variable = {
            messageFrom:user.userData._id,
            messageTo:Messages[idx].messageFrom._id,
            message:Message
        }

        axios.post('/api/message/sendMesage', variable)
        .then(res => {
            if(res.data.success){
                message.success('쪽지를 전송했습니다.')
                setModalVisible(!ModalVisible)
            }else{
                setModalVisible(!ModalVisible)
            }
        })
    }

    const modalVisibleHandler = () => {
        setModalVisible(!ModalVisible);
    }

    const deleteMSG = () => {
        if(SeletedMsg.length === 0){
            message.error("삭제하실 쪽지를 선택하세요");
            return
        }

        setOpenDeleteModal(!OpenDeleteModal);
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

        setModalVisible(!ModalVisible);
    }

    return (
        <Styled.Container>
            <h2>Message</h2>
            <Modal title="쪽지 보내기" visible={ModalVisible} onOk={sendMessageHandler} onCancel={modalVisibleHandler}>
                <Input.TextArea 
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    onChange={(e)=>{setMessage(e.target.value)}}
                    value={Message}>
                </Input.TextArea>
            </Modal>
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
                                <td className="msgFrom"><Writer writer={data.messageFrom._id} name={data.messageFrom.name}/></td>
                                <td className="msgContent">{data.message}</td>
                                <td>{data.createdAt.substring(0,10) +' '+ data.createdAt.substring(11,16)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Styled.MessageTable>
            :<Spin indicator={antIcon} />
            }
            <Modal title="메세지 삭제" visible={OpenDeleteModal} onOk={deleteMSGHandler} onCancel={()=>{setOpenDeleteModal(!OpenDeleteModal)}}>
                <p>쪽지를 삭제하시겠습니까?</p>
            </Modal>
            <div className="btnArea">
                <a onClick={sendReplyMSG}>답장</a>
                <a onClick={deleteMSG}>삭제</a>
            </div>
        </Styled.Container>
    )
}

export default Message
