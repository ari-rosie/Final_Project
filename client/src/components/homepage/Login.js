import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setCurrentUser, copyGardenFromDb } from "../../actions";
import { COLORS } from "../../constants";
import { fetchGarden } from "../../utilities";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { loggedIn } = useSelector((state) => state.userReducer);

  const handleLogin = async (e) => {
    e.preventDefault();
    const bod = {
      username: username,
      password: password,
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bod),
    };

    try {
      const res = await fetch(`/users/account/${email}`, reqObj);
      const account = await res.json();
      if (res.status === 201) {
        const gardenData = await fetchGarden(email);
        dispatch(setCurrentUser(account.data));
        dispatch(copyGardenFromDb(gardenData.data.garden));
      } else console.log(account.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      {!loggedIn && (
        <FormContainer>
          <h1>My Garden</h1>

          <form onSubmit={(e) => handleLogin(e)}>
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
            <button>LOGIN</button>
          </form>
          <Link to={"/new-account"}>
            <h2>Don't have an account? Click here!</h2>
          </Link>
        </FormContainer>
      )}
      {loggedIn && <Redirect to="/account" />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-image: url(${require("../../assets/harvest_bkg.jpg")});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: ${COLORS.title_green};
    margin: 0 20px 15px 0;
    background-color: ${COLORS.light_mint};
    width: 100%;
    text-align: center;
    height: 50px;
    border-radius: 2px;
    padding-top: 15px;
  }
`;

const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    border-radius: 4px;
    outline: none;
  }
  button {
    background-color: ${COLORS.title_green};
    color: whitesmoke;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 0.7em;
    border: none;
    margin: 10px auto 0 auto;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }
  h2 {
    color: ${COLORS.light_mint};
    font-size: 1.5em;
    margin-top: 10px;
  }
`;

export default Login;
