import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../images/logo.png";
import "./loginReg.css";
//import { useHistory } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/userAction";
import { LOGIN_REQUEST_SUCCESS } from "../../redux/constants/userConstans";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const LogoContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  margin-right: 5px;
  margin: 5px 0px;
  border-radius: 50%;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;
const Logo = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  margin-right: 5px;
  margin: 5px 0px;
  border-radius: 50%;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const RegisterContainer = styled.form``;

const Tilte = styled.h1`
  font-size: 30px;
  margin: 5px 0px;
`;

const Label = styled.label`
  font-size: 14px;
  margin: 5px 0px;
  background: transparent;
`;

const InputContainer = styled.div`
  padding: 3px 10px;
  background-color: rgba(249, 251, 159, 1);
  border-radius: 5px;
  margin: 5px 0px;
`;
const Input = styled.input`
  outline: none;
  border: none;
  background: transparent;
`;

const RegisterBtn = styled.button`
  padding: 3px 8px;
  color: white;
  background-color: rgba(30, 29, 29, 1);
  border-radius: 10px;
  cursor: pointer;
  margin: 5px 0px;
  border: none;
  font-size: 18px;
`;
const LoginContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  margin: 5px 0px;
`;

const LoginBtn = styled.button`
  padding: 3px 8px;
  color: white;
  background-color: rgba(35, 36, 36, 1);
  border-radius: 10px;
  cursor: pointer;
  margin: 5px 0px;
  border: none;
  font-size: 18px;
`;

const SignUpLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rname, setRname] = useState("");
  const [remail, setRmail] = useState("");
  const [rpassword, setRpassword] = useState("");
  //const [file,setFile] = useState(null)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(rname,remail,rpassword,file)

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      name: rname,
      email: remail,
      password: rpassword,
    };

    // if(file){
    //   const data = new FormData()
    //   const filename = new Date() + file.name
    //   data.append("name",filename)
    //   data.append("file",file)
    //   newUser.profilePic = filename

    //   try{
    //     await axios.post("http://localhost:4000/api/upload",data)
    //   }catch(err){}
    // }
    try {
      await axios.post("http://localhost:4000/api/register", newUser);
      navigate("/");
    } catch (err) {
      console.log("error form register");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(login(email, password));
    } catch (err) {
      window.location.reload();
      console.log("login failed");
    }
  };

  return (
    <>
      <Container>
        <LogoContainer>
          <Logo src={logo} alt="" />
        </LogoContainer>

        <form onSubmit={submitHandler}>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            Register
          </h1>
          <Label>Name</Label>
          <InputContainer>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => setRname(e.target.value)}
            />
          </InputContainer>
          <Label>Email</Label>
          <InputContainer>
            <Input
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => setRmail(e.target.value)}
            />
          </InputContainer>
          <Label>Password</Label>
          <InputContainer>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setRpassword(e.target.value)}
            />
          </InputContainer>
          {/* <Label>Image</Label>
        <InputContainer>
          {file && <Img
            src={URL.createObjectURL(file)}
            alt=""
            
          />}
          <Input type="file" placeholder="Image" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])} />
        </InputContainer> */}
          <RegisterBtn type="submit">Register</RegisterBtn>
        </form>
        <form onSubmit={loginSubmit}>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            Login
          </h1>
          <Label>Email</Label>
          <InputContainer>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <Label>Password</Label>
          <InputContainer>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <LoginBtn type="submit">Login</LoginBtn>
        </form>
      </Container>
    </>
  );
};

export default SignUpLogin;
