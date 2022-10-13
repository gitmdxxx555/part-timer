import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import PublicIcon from "@mui/icons-material/Public";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import Picker from "emoji-picker-react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./viewAllComments.css";
import { Link } from "react-router-dom";
import ViewComment from "./viewComment/ViewComment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;
const Title = styled.h1`
  font-size: 26px;
  flex: 3;
  text-align: center;
  background: transparent;
`;

const CloseIconDiv = styled.div`
  cursor: pointer;
`;

const PImg = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 3px solid yellow;
  cursor: pointer;
  object-fit: cover;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const CPImg = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 3px solid yellow;
  cursor: pointer;
  object-fit: cover;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const Name = styled.span`
  font-size: 16px;
  margin-left: 5px;
  cursor: pointer;
`;
const DateTime = styled.div`
  font-size: 14px;
  color: gray;
`;

const Desc = styled.p`
  padding: 0px 20px 10px 20px;
`;

const PostImg = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
`;

const Input = styled.div`
  margin-right: 7px;
  border-radius: 10px;
  width: 100%;
`;

const Comment = styled.div`
  border-radius: 10px;
  margin-left: 10px;
  font-size: 14px;
`;

const ReplayContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 45px;
`;

const ReplayPImg = styled.img`
  height: 30px;
  width: 30px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid yellow;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const ReplayContainerSec = styled.div`
  display: flex;
  align-items: center;
  margin-left: 85px;
`;

const ViewAllComments = ({ res }) => {
  const { user: logedInUser } = useSelector((state) => state.user);

  const PF = "http://localhost:4000/images/";

  const [showPicker, setShowPicker] = useState(false);
  const [comment, setComment] = useState("");
  const [slice, setSlice] = useState();
  const [inputBox, setInputBox] = useState(false);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/comments/${res._id}`
        );
        setComments(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [res._id]);
  const [post, setPost] = useState();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/singlepost/${res._id}`
        );
        setPost(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [res._id]);

  console.log(res._id);
  console.log(post);

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

  const handleLoad = () => {
    window.location.reload();
  };

  console.log(comment);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          width: "40%",
          borderRadius: "10px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          borderTopRightRadius: "0px",
          backgroundColor: "rgba(194, 193, 193, 0.781)",
          color: "black",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          position: "fixed",
          top: "7.6%",
          left: "27%",
        }}
      >
        <Title>Yazeed's Post</Title>
        <CloseIconDiv onClick={handleLoad}>
          <CloseIcon
            style={{ borderRadius: "50%", padding: "5px", color: "black" }}
          />
        </CloseIconDiv>
      </div>
      <hr
        style={{
          border: "0.2px solid gray",
          margin: "0px 0px 10px 0px",
          borderBottom: "none",
          marginTop: "76px",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 20px 5px 20px",
        }}
      >
        <PImg
          src={PF + post?.ownerPic}
          alt=""
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            flex: "3",
          }}
        >
          <div style={{ marginLeft: "5px", gap: "10px" }}>
            <Name>Messi</Name>
            <DateTime>
              9 hrs ago.
              <PublicIcon
                style={{
                  fontSize: "8px",
                  marginLeft: "2px",
                  background: "transparent",
                }}
              />
            </DateTime>
          </div>
        </div>
        <MoreHorizIcon style={{ background: "transparent" }} />
      </div>
      <Desc>hi huys how you doing</Desc>
      <PostImg
        src={PF + post?.img}
        alt=""
      />
      <Div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <ThumbUpOffAltIcon style={{ background: "transparent" }} />
          Like
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <ChatBubbleOutlineIcon style={{ background: "transparent" }} />
          Comment
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <ShareIcon style={{ background: "transparent" }} />
          Share
        </div>
      </Div>
      <hr
        style={{
          border: "0.2px solid gray",
          margin: "0px 20px 20px 20px",
          borderBottom: "none",
        }}
      />
      {comments?.map((ct, index) => (
        <ViewComment ct={ct} key={index} />
       
      ))}

      <ReplayContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 20px",
          }}
        >
          <ReplayPImg
            src="https://imageio.forbes.com/specials-images/imageserve/627bd4c60412e4343323ad21/0x0.jpg?format=jpg&crop=1478,1478,x467,y0,safe&height=416&width=416&fit=bounds"
            alt=""
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "rgba(253, 245, 153, 0.975)",
              borderRadius: "10px",
              padding: "5px",
              gap: "5px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            <span style={{ color: "gray" }}>hgkjgkg</span>

            <Comment>jhgjgkk</Comment>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                fontSize: "12px",
              }}
            >
              <div style={{ margin: "0px 5px " }}>Like</div>
              <div style={{ margin: "0px 5px " }}>Replay</div>
              <div style={{ margin: "0px 5px " }}>Share</div>
            </div>
          </div>
        </div>
      </ReplayContainer>
      <ReplayContainerSec>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 25px",
          }}
        >
          <ReplayPImg
            src="https://imageio.forbes.com/specials-images/imageserve/627bd4c60412e4343323ad21/0x0.jpg?format=jpg&crop=1478,1478,x467,y0,safe&height=416&width=416&fit=bounds"
            alt=""
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "rgba(253, 245, 153, 0.975)",
              borderRadius: "10px",
              padding: "5px",
              gap: "5px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            <span style={{ color: "gray" }}>ggkgkk</span>

            <Comment>gkjgkjgkj</Comment>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                fontSize: "12px",
              }}
            >
              <div style={{ margin: "0px 5px " }}>Like</div>
              <div style={{ margin: "0px 5px " }}>Replay</div>
              <div style={{ margin: "0px 5px " }}>Share</div>
            </div>
          </div>
        </div>
      </ReplayContainerSec>
      <div style={{ marginBottom: "10px", height: "20px" }}></div>
      <div
        style={{
          position: "fixed",
          left: "27%",
          bottom: "6.1%",
          padding: "10px 0px 10px 20px",
          width: "41.5%",
          backgroundColor: "rgba(194, 193, 193, 0.781)",
          borderBottomLeftRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "transparent",
          }}
        >
          <CPImg
            src={PF + logedInUser?.profilePic}
            alt=""
          />
          <input
            type="text"
            placeholder="Write a comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              width: "50%",
              marginLeft: "5px",
            }}
          />
          <div className="picker-container">
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
              backgroundColor: "rgba(65, 63, 63, 0.935)",
              borderRadius: "5px",
              padding: "0px 5px 3px 5px",
              margin: "0px 10px",
              cursor: "pointer",
              color: "white",
            }}
          >
            post
          </span>
        </div>
      </div>
    </Container>
  );
};

export default ViewAllComments;
