import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeFeed from "../seller/homeFeed/HomeFeed";
import Leftbar from "../seller/leftbar/Leftbar";
import Navbar from "../seller/navbar/Navbar";
import Rightbar from "../seller/rightbar/Rightbar";
import Share from "../seller/share/Share";
import axios from "axios";

const Container = styled.div`
  flex: 1;
  display: flex;
  padding: 20px 50px;
  gap: 30px;
  background-color: rgba(238, 236, 238, 1);
`;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/posts");
        setResult(
          res.data.reverse()
        );
      } catch (err) {}
    };
    fetchResult();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/allusers");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  

  // console.log(result);

  //console.log(users);
  return (
    <>
      <Navbar />
      <Container>
        <Leftbar />
        <div style={{ display: "flex", flexDirection: "column", flex: "2" }}>
          <Share />
          {result?.map((res) => (
            <HomeFeed res={res} key={res._id}/>
          ))}
        </div>
        <Rightbar users={users} />
      </Container>
    </>
  );
};

export default Home;
