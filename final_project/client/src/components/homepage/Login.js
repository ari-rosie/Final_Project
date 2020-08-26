import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentUser } from "../../actions";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { loggedIn } = useSelector((state) => state.userReducer);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/users/account/${email}?username=${username}&password=${password}`
      );
      const account = await res.json();
      if (account.status === 200) {
        dispatch(setCurrentUser(account.data));
      } else console.log(account.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!loggedIn && (
        <>
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
            <button>Login</button>
          </form>
          <Link to={"/new-account"}>
            <h2>Don't have an account? Click here!</h2>
          </Link>
        </>
      )}
      {loggedIn && <Redirect to="/account" />}
    </>
  );
};

export default Login;
