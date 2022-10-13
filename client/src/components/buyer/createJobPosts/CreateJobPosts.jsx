import React, { useRef, useState } from "react";
import styled from "styled-components";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import axios from "axios";
import "./CreateJobPosts.css";
import { Link } from "react-router-dom";

const Container = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
  gap: 20px;
  background-color: white;
  border-radius: 10px;
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

const CreateJobPosts = () => {
  const { user: logedinUser } = useSelector((state) => state.user);
  const PF = "http://localhost:4000/images/";
  const desc = useRef();
  const [file, setFile] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const newJobPost = {
      userId: logedinUser?._id,
      ownerPic: logedinUser?.profilePic,
      ownerName: logedinUser?.name,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      newJobPost.img = filename;
      try {
        await axios.post("http://localhost:4000/api/upload", data);
        window.location.reload();
        console.log("successup");
      } catch (err) {
        console.log("upload fail");
      }
    }
    try {
      await axios.post("http://localhost:4000/api/jobpost", newJobPost);
      window.location.reload();
      console.log("success");
    } catch (err) {
      console.log("fail newPost");
    }
  };
  console.log(desc, file);
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
      <Link to={`/profile/${logedinUser?._id}`}>

        <Img src={PF + logedinUser?.profilePic} alt="" />
      </Link>
        <Input type="text" placeholder="Create a Job Post ..." ref={desc} />
      </div>
      <hr />
      {file && (
        <div className="postImgContainer">
          <img
            className="postShareImgage"
            src={URL.createObjectURL(file)}
            alt=""
          />
          <CloseIcon
            className="postShareCancelImgage"
            onClick={() => setFile(null)}
          />
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "transparent",
        }}
      >
      
          <label htmlFor="file" style={{ background: "transparent" }}>
            <div
              style={{
                background: "transparent",
                display: "flex",
                alignItems:"center",
                alignItems: "center",
                cursor: "pointer",
                gap: "3px",
              }}
            >
              <InsertPhotoIcon
                style={{
                  background: "transparent",
                  color: "rgba(4, 143, 198, 0.96)",
                }}
              />
              Photo
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </label>

          <button
            style={{
              background: "rgba(205, 60, 60, 0.97)",
              color: "white",
              padding: "5px",
              cursor: "pointer",
              border: "3px solid yellow",
              borderRadius: "5px",
            }}
            onClick={submitHandler}
          >
            Post
          </button>
        
      </div>
      <hr style={{ margin: "10px 0px", color: "lightgray" }} />
    </Container>
  );
};

export default CreateJobPosts;
