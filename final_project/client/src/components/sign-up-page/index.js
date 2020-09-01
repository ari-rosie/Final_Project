import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

import { COLORS } from "../../constants";

const SignUpPage = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  const [newUserFlag, setNewUserFlag] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const bod = {
      newUser: {
        username: username,
        email: email,
        password: password,
        gardenWidth: width,
        gardenHeight: height,
      },
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bod),
    };

    try {
      const send = await fetch("users/new", reqObj);
      const res = await send.json();
      if (res.status === 201) setNewUserFlag(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      {newUserFlag && <Redirect to="/" />}
      <form onSubmit={(e) => handleSignUp(e)}>
        <div>
          <h1>My Garden</h1>

          <input
            type="text"
            placeholder="USERNAME"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="EMAIL"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="PASSWORD"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to={"/"}>
            <h2>Already have an account? Log in!</h2>
          </Link>
        </div>
        <div>
          <input
            type="number"
            placeholder="GARDEN LENGTH"
            onChange={(e) => setWidth(e.target.value)}
          />
          <label>METERS</label>
          <input
            type="number"
            placeholder="GARDEN WIDTH"
            onChange={(e) => setHeight(e.target.value)}
          />
          <label>METERS</label>
          <button>SIGN UP</button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-image: url(${require("../../assets/493312.jpg")});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: ${COLORS.title_green};
    padding-bottom: 15px;
  }

  h2 {
    color: ${COLORS.dark_teal};
    cursor: pointer;
    margin-top: 10px;
  }

  form {
    background-color: rgba(245, 245, 245, 0.7);
    display: flex;
    padding: 30px;
    border-radius: 2px;
    color: ${COLORS.dark_teal};

    div {
      display: flex;
      flex-direction: column;
    }

    div:first-child {
      padding-right: 20px;
      border-right: 2px ${COLORS.tomato} solid;
    }

    div:last-child {
      margin-left: 20px;
    }

    button {
      background-color: ${COLORS.tomato};
      color: whitesmoke;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      margin-left: 100px;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;

export default SignUpPage;
