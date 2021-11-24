import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import {Modal, Input, message} from 'antd'
import { withRouter } from 'react-router'
import axios from 'axios'
import './Post.css'
import * as Styled from './style';

function Writer(props) {

    const user = useSelector(state => state.user_reducer)

    const [ModalVisible, setModalVisible] = useState(false)
    const [Message, setMessage] = useState('')
    const [PopoverVisible, setPopoverVisible] = useState(false)
    
    const modalVisibleHandler = () => {
        setModalVisible(!ModalVisible)
    }

    //해당 유저 포스트 페이지로 이동
    const viewWriterPost = () => { 
        props.history.push(`/Post/${props.writer}`)
    }

    const sendMessageHandler2 = () => {
        setPopoverVisible(!PopoverVisible)
        setModalVisible(!ModalVisible)
    }

    //API(sendMessage) : 서버에 메세지 저장
    const sendMessageHandler = () => {

        if(Message.length === 0){
            message.error('메세지를 입력해주세요.')
            return
        }

        const variable = {
            messageFrom:user.userData._id,
            messageTo:props.writer,
            message:Message
        }

        axios.post('/api/message/sendMesage', variable)
        .then(res => {
            if(res.data.success){
                message.success('쪽지를 전송했습니다.')
                setMessage('');
                setModalVisible(!ModalVisible)
            }else{
                setModalVisible(!ModalVisible)
            }
        })
    }

    const content = (
        <div className="userInfo">
            
        </div>
    );

    return (
        <div>
            {/* <Popover style={{zIndex:'0'}} placement="bottom" content={content}>
                <span className="writer">{props.name}</span>
            </Popover> */}
            <span className="writer" onClick={()=>{setPopoverVisible(!PopoverVisible)}}>{props.name}</span>
            <Styled.Popover open={PopoverVisible}>
            {
                user.userData._id !== props.writer ?   
                    <>    
                        <span onClick={viewWriterPost}>이 유저의 포스트 보기</span>
                        <span onClick={sendMessageHandler2}>쪽지 보내기</span>
                    </>
                :<span onClick={viewWriterPost}>내 포스트 보기</span>
            }      
            </Styled.Popover>
            <Modal title={`[${props.name}]에게 쪽지 보내기`} visible={ModalVisible} onOk={sendMessageHandler} onCancel={modalVisibleHandler}>
                <Input.TextArea 
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    onChange={(e)=>{setMessage(e.target.value)}}
                    value={Message}>
                </Input.TextArea>
            </Modal>
        </div>
    )
}

export default withRouter(Writer)
