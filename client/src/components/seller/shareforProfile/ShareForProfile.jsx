import React from "react";
import styled from "styled-components";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import { useSelector } from "react-redux";

const Container = styled.div`
align-self: center;
  display: flex;
  flex-direction: column;
  width: 584px;
  gap: 20px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 20px;
  /* -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75); */
`;
const Img = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid yellow;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;
const Input = styled.input`
  border: none;
  outline: none;
  width: 70%;
  background: transparent;
  font-size: 12px;
`;

const ShareForProfile = () => {
  const {user:logedInUser} = useSelector(state=>state.user)
  const PF = "http://localhost:4000/images/";
  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "transparent",
        }}
      >
        <Img
          src={PF + logedInUser?.profilePic}
          alt=""
        />
        <Input type="text" placeholder="Share Your Skills videos images ..." />
      </div>
      <hr style={{margin:"10px 0px",color:"lightgray"}}/>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "transparent",
        }}
      >
        <div
          style={{
            background: "transparent",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: "3px"
          }}
        >
          <PhotoLibraryOutlinedIcon style={{background:"transparent",color:"blue"}}/>
          Photo/Video
        </div>
        <div
          style={{
            background: "transparent",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: "3px"
          }}
        >
          <SentimentVerySatisfiedIcon style={{background:"transparent",color:"red"}} />
          Feeling/Activity
        </div>
        <button
          style={{
            background: "green",
            color: "white",
            padding: "5px",
            cursor: "pointer",
            border: "3px solid yellow",
            borderRadius: "5px",
          }}
        >
          Share
        </button>
      </div>
    </Container>
  );
};

export default ShareForProfile;
