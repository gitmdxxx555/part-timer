import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { display } from "@mui/system";

const Container = styled.div`
  margin: 5px 10px 0px 67px;
`;

const CommentPImg = styled.img`
  height: 25px;
  width: 25px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid yellow;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const InputContainer = styled.div`
  background: rgba(253, 245, 153, 0.975);
  border-radius: 10px;
  display: flex;
  align-items: center;
  height: 30px;
  margin-left: 5px;
  width: 100%;
`;
const Input = styled.input`
  margin-left: 5px;
  background: transparent;
  width: 90%;
  font-size: 14px;
  border: none;
  outline: none;
`;

const ReplayCommentInput = ({ res, setActiveComment, activeComment }) => {
  const { user: logedInUser } = useSelector((state) => state.user);

  const [showPicker, setShowPicker] = useState(false);
  const [comment, setComment] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setComment((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const createComment = async () => {
    try {
      const newComment = {
        postId: res._id,
        userId: logedInUser._id,
        comment: comment,
        commenterPic: logedInUser.profilePic,
        commenterName: logedInUser.name,
      };
      await axios.post(`http://localhost:4000/api/comment`, newComment);
      setComment("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CommentPImg src={logedInUser?.profilePic} alt="" />
        <InputContainer>
          <Input
            type="text"
            placeholder="Right replay.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="picker-container">
            {/* <input
          className="input-style"
          value={inputStr}
          onChange={e => setInputStr(e.target.value)} /> */}
            <img
              className="emoji-icon"
              src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
              onClick={() => setShowPicker((val) => !val)}
            />
            {showPicker && (
              <Picker
                pickerStyle={{ width: "100%" }}
                onEmojiClick={onEmojiClick}
              />
            )}
          </div>
          <span
            onClick={createComment}
            style={{
              backgroundColor: "black",
              borderRadius: "5px",
              padding: "0px 5px 3px 5px",
              margin: "0px 5px",
              cursor: "pointer",
              color: "white",
            }}
          >
            post
          </span>
        </InputContainer>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "5px 5px",
          background: "transparent",
        }}
      >
        <button
          style={{ background: "transparent", border: "none",color:"blue",cursor:"pointer" }}
          onClick={() => setActiveComment(null)}
        >
          Cancel
        </button>
      </div>
    </Container>
  );
};

export default ReplayCommentInput;
