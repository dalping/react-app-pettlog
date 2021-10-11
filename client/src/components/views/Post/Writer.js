import React, {useState} from 'react'
import {Popover, Modal, Input, message} from 'antd'

function Writer(props) {

    const [ModalVisible, setModalVisible] = useState(false)
    
    const modalVisibleHandler = () => {
        setModalVisible(!ModalVisible)
    }

    const sendMessageHandler = () => {
        message.success('쪽지를 전송했습니다.')
        setModalVisible(!ModalVisible)
    }

    const content = (
        <div className="userInfo">
            <span>포스트 보기</span>
            <span>구독하기</span>
            <span onClick={modalVisibleHandler}>쪽지 보내기</span>
        </div>
    );


    return (
        <>
            <Popover placement="bottom" content={content} trigger="click">
                <span className="writer">{props.writer.name}</span>
            </Popover>
            <Modal title="쪽지 보내기" visible={ModalVisible} onOk={sendMessageHandler} onCancel={modalVisibleHandler}>
                <Input.TextArea 
                    autoSize={{ minRows: 5, maxRows: 5 }}>
                </Input.TextArea>
            </Modal>
        </>
    )
}

export default Writer
