import React, { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

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
    <>
      {newUserFlag && <Redirect to="/" />}
      <form onSubmit={(e) => handleSignUp(e)}>
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
        <button>Sign up</button>
      </form>
    </>
  );
};

export default SignUpPage;
