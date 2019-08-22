import React, { useState } from "react";

const LoginForm = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const login = () => {
          props.onSubmit({ username, password });
        };

        login();
        setUsername("");
        setPassword("");
      }}
    >
      <input
        type="text"
        placeholder="username"
        name="username"
        onChange={e => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
