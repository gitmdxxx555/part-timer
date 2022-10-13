import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "@mui/material";

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 10px 0px;
  width: 584px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  /* -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75); */
`;
const FeedTopImg = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid yellow;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;
const LikedImg = styled.img`
  height: 25px;
  width: 25px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;
const DateTime = styled.span`
  flex: 4;
  font-size: 16px;
  color: gray;
  margin-left: 10px;
`;
const TopIcon = styled.span`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const Desc = styled.div`
  font-size: 16px;
  margin: 10px 0px;
`;

const FeedImg = styled.img`
  height: 400px;
  width: 100%;
  margin: 10px 0px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px;
`;
const LikeBtn = styled.span`
  font-size: 16px;
  cursor: pointer;
`;
const CommentBtn = styled.span`
  font-size: 16px;
  cursor: pointer;
`;
const ShareBtn = styled.span`
  font-size: 16px;
  cursor: pointer;
`;
const Hr = styled.hr`
  color: lightgray;
  font-size: 0.5px;
  margin: 10px 0px;
`;

const Text = styled.p`
  font-size: 12px;
`;

const CommentPImg = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid yellow;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const Username = styled.span`
  font-size: 12px;
`;
const Comment = styled.div`
  border-radius: 10px;
  margin-left: 10px;
  font-size: 14px;
`;
const Replay = styled.span`
  font-size: 12px;
`;
const InputContainer = styled.div`
  background: rgba(253, 245, 153, 0.975);
  border-radius: 10px;
  display: flex;
  align-items: center;
  height: 40px;
  margin-left: 5px;
  width: 100%;
`;
const Input = styled.input`
  margin-left: 5px;
  background: transparent;
  font-size: 14px;
  border: none;
  outline: none;
`;

const ProfileFeedPosts = ({ post }) => {
  const { user: logedInUser } = useSelector((state) => state.user);
  const PF = "http://localhost:4000/images/";

  const [isShown, setIsShown] = useState(false);
  const [comments, setComments] = useState([]);
  const [likedUsers, setLikedUsers] = useState();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/comments/${post._id}`
        );
        setComments(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [post._id]);

  useEffect(() => {
    const fetchLikedUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/likedusers/${post._id}`
        );
        setLikedUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLikedUsers();
  }, [post._id]);

  console.log(likedUsers);

  const userId = logedInUser?._id;

  const likeHandler = async () => {
    try {
      await axios.put(`http://localhost:4000/api/like-unlike/${post._id}`, {
        userId,
      });
      window.location.reload();
      console.log("like success");
    } catch (err) {
      console.log("like fail");
    }
  };

  return (
    <FeedContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FeedTopImg src={PF + post?.ownerPic} alt="" />
        <DateTime>12 jun 2022</DateTime>
        <TopIcon>
          <MoreHorizIcon style={{ background: "transparent" }} />
        </TopIcon>
      </div>
      <Desc>Congrats ...</Desc>
      <FeedImg src={PF + post?.img} alt="" />
      <Hr />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <LikeBtn onClick={likeHandler}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            <ThumbUpOutlinedIcon
              style={{
                background: "transparent",
                marginRight: "5px",
                color: post?.likes.includes(userId) > 0 ? "blue" : "black",
              }}
            />
            Like{" "}
            <span style={{ marginLeft: "5px", marginTop: "2px" }}>
              {post?.likes.length === 0 ? "" : post?.likes.length}
            </span>
            {isShown && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: "40px",
                    left: "70px",
                    background: "rgba(231, 230, 230, 1)",
                    padding: "10px",
                    borderRadius: "10px",
                    zIndex:"5"
                  }}
                >
                  {likedUsers?.map((user) => (
                    <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            margin: "5px 0px",
                          }}
                          key={user?._id}
                        >
                          <LikedImg src={PF + user?.profilePic} alt="" />
                          <p style={{ fontSize: "12px" }}>{user?.name}</p>
                        </div>
                    </>
                  ))}
                </div>
              </>
            )}
          </div>
        </LikeBtn>
        <CommentBtn>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ChatBubbleOutlineOutlinedIcon
              style={{ background: "transparent", marginRight: "5px" }}
            />
            Comment{" "}
            <span style={{ marginLeft: "5px", marginTop: "2px" }}>
              {comments?.length === 0 ? "" : comments?.length}
            </span>
          </div>
        </CommentBtn>
        <ShareBtn>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ShareOutlinedIcon
              style={{ background: "transparent", marginRight: "5px" }}
            />
            Share
          </div>
        </ShareBtn>
      </div>
      <Hr />
      <div style={{ display: "flex", alignItems: "center" }}>
        <CommentPImg src={PF + logedInUser?.profilePic} alt="" />
        <InputContainer>
          <Input type="text" placeholder="Right a public comment.." />
        </InputContainer>
      </div>

      {comments?.map((comment, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "10px 0px",
            zIndex: "4",
          }}
          key={index}
        >
          <CommentPImg src={PF + comment?.commenterPic} alt="" />
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
            <Comment>{comment?.commenterName}</Comment>
            <Comment>
              <span style={{ color: "gray" }}>{comment?.comment}</span>
            </Comment>
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
      ))}
      <div>
        {comments.length === 0 ? (
          <div style={{ margin: "10px 50px 0px 50px", cursor: "pointer" }}>
            Be the first person who commented on this post
          </div>
        ) : (
          <div
            style={{ margin: "0px 50px", cursor: "pointer" }}
            // onClick={() => setCommentBox(!commentBox)}
          >
            View more comments
          </div>
        )}
      </div>
    </FeedContainer>
  );
};

export default ProfileFeedPosts;
