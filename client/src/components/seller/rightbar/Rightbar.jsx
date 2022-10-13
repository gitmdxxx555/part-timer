import React from "react";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import styled from "styled-components";
import ChatIcon from '@mui/icons-material/Chat';
import "./rightbar.css";

const Container = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  height: calc(100vh - 90px);
  overflow-y: scroll;
  position: sticky;
  top: 10px;
  /* -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75); */
`;
const Hr = styled.hr`
  color: lightgray;
  font-size: 0.5px;
  margin: 10px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
margin: 10px 0px 40 0px;
  gap: 20px;
`;
const PImg = styled.img`
  height: 60px;
  width: 60px;
  border: 3px solid yellow;
  margin: 5px 0px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const PName = styled.p`
  font-size: 14px;
`;
const Skills = styled.div`
  font-size: 14px;
`;
const FollowBtn = styled.div`
  padding: 3px 8px;
  background-color: rgba(12, 130, 226, 1);
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin: 5px 0px;
  color: white;
  cursor: pointer;
  text-align: center;
`;
const ChatBtn = styled.div`
  padding: 3px 8px;
  margin: 5px 0px;
  background-color: rgba(193, 5, 46, 1);
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  text-align: center;
`;

const Rightbar = ({ users }) => {
 // console.log(users);
 const PF = "http://localhost:4000/images/";
  return (
    <Container>
      {users && users.map((user,index)=>(
    <>
      <Wrapper key={index}>
   

        <div>
        <Link to={`/profile/${user._id}`} className="link" >
          <PImg
            src={PF + user?.profilePic}
            alt=""
          />
          </Link>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
           <FollowBtn>Follow<AddIcon style={{background:"transparent",marginLeft:"5px",fontSize:"16px"}}/></FollowBtn>
      <ChatBtn>Chat<ChatIcon style={{background:"transparent",marginLeft:"10px",fontSize:"16px"}}/></ChatBtn>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
          
            <div style={{ margin: "0px 5px", fontSize:"14px" }}>Name: {user?.name}</div>
          <div style={{ margin: "0px 5px", fontSize:"14px" }}>Email: {user?.email}</div>
          <div style={{ margin: "0px 5px", fontSize:"14px" }}>Mobile: {user?.MobileNum || " Nill"}</div>
          <div style={{ margin: "0px 5px", fontSize:"14px" }}>Studied At: {user?.studiedAt || " Nill"}</div>
          <div style={{ margin: "0px 5px", fontSize:"14px" }}>Lives In: {user?.livesIn || " Nill"}</div>
          
        </div>
     
      </Wrapper>
      <hr style={{ margin: "10px 0px", color: "lightgray" }} />
      </>
      ))}

    </Container>
  );
};

export default Rightbar;
