import React, { useState } from "react";
import { CloseCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import axios from "axios";
import "./Comment.css";
import { MakeDate } from "../../modules/MakeDate";

import InputReplyComment from "./InputReplyComment";

function Comment(props) {
  const [OpenReplyComment, setOpenReplyComment] = useState(false);

  const deleteCommnet = (commentId) => {
    axios.post("/api/comment/deleteComment", { _id: commentId }).then((res) => {
      if (res.data.success) {
        props.deleteComment(commentId);
      }
    });
  };

  const openReplyHandler = () => {
    setOpenReplyComment(!OpenReplyComment);
  };

  return (
    <>
      <div className="comment">
        <div className="profileImg">
          {props.comment.userId.profileImage ? (
            <Avatar
              size={48}
              src={`${props.comment.userId.profileImage}`}
              style={{ marginRight: "10px" }}
            />
          ) : (
            <Avatar
              size={48}
              icon={<UserOutlined />}
              style={{ marginRight: "10px" }}
            />
          )}
        </div>
        <div className="commentMain">
          <span className="commentWriter">{props.comment.userId.name}</span>
          <span style={{ textAlign: "justify" }}>
            {props.comment.comment}
            <br />
            <span className="commentDate">
              {MakeDate(props.comment.createdAt)}
            </span>
            <span className="commentReplyBtn" onClick={openReplyHandler}>
              Reply
            </span>
            {props.user._id === props.comment.userId._id && (
              <CloseCircleOutlined
                className="commentDeleteBtn"
                onClick={() => {
                  deleteCommnet(props.comment._id);
                }}
              />
            )}
          </span>
        </div>
      </div>
      {
        //Input Reply Comment
        OpenReplyComment ? (
          <InputReplyComment
            comment={props.comment}
            user={props.user}
            post={props.post}
            updateComment={props.updateComment}
            openReplyHandler={openReplyHandler}
          />
        ) : null
      }
      {
        //Reply Comments
        props.comments.map(
          (data, idx) =>
            data.replyTo &&
            data.replyTo === props.comment._id && (
              <div className="comment" key={idx}>
                <span style={{ marginRight: "10px" }}> ↳ </span>
                <div className="profileImg">
                  {data.userId.profileImage ? (
                    <Avatar
                      size={48}
                      src={`${data.userId.profileImage}`}
                      style={{ marginRight: "10px" }}
                    />
                  ) : (
                    <Avatar
                      size={48}
                      icon={<UserOutlined />}
                      style={{ marginRight: "10px" }}
                    />
                  )}
                </div>
                <div className="commentMain">
                  <span className="commentWriter">{data.userId.name}</span>
                  <span className="commentContent">
                    {data.comment}
                    <br />
                    <span className="commentDate">
                      {MakeDate(props.comment.createdAt)}
                    </span>
                    {data.userId._id === props.user._id && (
                      <CloseCircleOutlined
                        className="commentDeleteBtn"
                        onClick={() => {
                          deleteCommnet(data._id);
                        }}
                      />
                    )}
                  </span>
                </div>
              </div>
            )
        )
      }
    </>
  );
}

export default Comment;
