import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import {Popover, Modal, Input, message} from 'antd'
import { withRouter } from 'react-router'
import axios from 'axios'

function Writer(props) {

    const user = useSelector(state => state.user_reducer)

    const [ModalVisible, setModalVisible] = useState(false)
    const [Message, setMessage] = useState('')
    
    const modalVisibleHandler = () => {
        setModalVisible(!ModalVisible)
    }

    //해당 유저 포스트 페이지로 이동
    const viewWriterPost = () => { 
        props.history.push(`/Post/${props.writer._id}`)
    }

    //API(sendMessage) : 서버에 메세지 저장
    const sendMessageHandler = () => {

        const variable = {
            messageFrom:user.userData._id,
            messageTo:props.writer._id,
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

    const content = (
        <div className="userInfo">
            <span onClick={viewWriterPost}>포스트 보기</span>
            <span onClick={modalVisibleHandler}>쪽지 보내기</span>
        </div>
    );

    return (
        <div>
            {
               user.userData._id !== props.writer._id ?
               <Popover style={{zIndex:'0'}}placement="bottom" content={content}>
                    <span className="writer">{props.writer.name}</span>
                </Popover>
                : <span className="writer">{props.writer.name}</span>
            }
            <Modal title="쪽지 보내기" visible={ModalVisible} onOk={sendMessageHandler} onCancel={modalVisibleHandler}>
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
