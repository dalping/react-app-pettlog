import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Input, message } from "antd";
import { withRouter } from "react-router";
import { animated, useSpring } from "react-spring";
import axios from "axios";
import "./Post.css";
import * as Styled from "./style";

function Writer(props) {
  const user = useSelector((state) => state.user_reducer);

  const [ModalVisible, setModalVisible] = useState(false);
  const [Message, setMessage] = useState("");
  const [PopoverVisible, setPopoverVisible] = useState(false);
  const [AnimationMode, setAnimationMode] = useState(false);

  useEffect(() => {
    let timer;

    if (AnimationMode) {
      setPopoverVisible(true);
    } else {
      timer = setTimeout(() => {
        setPopoverVisible(false);
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [AnimationMode]);

  const animation = useSpring({
    confing: {
      duration: 500,
    },
    opacity: AnimationMode ? "1" : "0",
  });

  const modalVisibleHandler = () => {
    setModalVisible(!ModalVisible);
  };

  const PopoverVisibleHandler = () => {
    setAnimationMode(!AnimationMode);
  };

  //해당 유저 포스트 페이지로 이동
  const viewWriterPost = () => {
    props.history.push(`/Post/${props.writer}`);
  };

  const openMessageModal = () => {
    PopoverVisibleHandler();
    setModalVisible(!ModalVisible);
  };

  //API(sendMessage) : 서버에 메세지 저장
  const sendMessage = () => {
    if (Message.length === 0) {
      message.error("메세지를 입력해주세요.");
      return;
    }

    const variable = {
      messageFrom: user.userData._id,
      messageTo: props.writer,
      message: Message,
    };

    axios.post("/api/message/sendMesage", variable).then((res) => {
      if (res.data.success) {
        message.success("쪽지를 전송했습니다.");
        setMessage("");
        setModalVisible(!ModalVisible);
      } else {
        setModalVisible(!ModalVisible);
      }
    });
  };

  return (
    <div>
      <span className="writer" onClick={PopoverVisibleHandler}>
        {props.name}
      </span>
      {PopoverVisible ? (
        <animated.div style={animation}>
          <Styled.Popover open={PopoverVisible}>
            {user.userData._id !== props.writer ? (
              <>
                <span onClick={viewWriterPost}>이 유저의 포스트 보기</span>
                <span onClick={openMessageModal}>쪽지 보내기</span>
              </>
            ) : (
              <span onClick={viewWriterPost}>내 포스트 보기</span>
            )}
          </Styled.Popover>
        </animated.div>
      ) : null}
      <Modal
        title={`[${props.name}]에게 쪽지 보내기`}
        visible={ModalVisible}
        onOk={sendMessage}
        onCancel={modalVisibleHandler}
      >
        <Input.TextArea
          autoSize={{ minRows: 5, maxRows: 5 }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={Message}
        ></Input.TextArea>
      </Modal>
    </div>
  );
}

export default withRouter(Writer);
