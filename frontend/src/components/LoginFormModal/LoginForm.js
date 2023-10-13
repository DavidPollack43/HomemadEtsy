import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import SignupFormModal from "../SignUpFormModal";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showSignup, setShowSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  const handleClick = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    setShowSignup(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      {showSignup ? (
        <SignupFormModal />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <h2>Sign in</h2>
            <button onClick={handleClick} className="registerButton">Register</button>
          </div>
          
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          
          <br/>

          <label>
            Username or Email
            <br />
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>

          <br/>

          <label>
            Password
            <br/>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <br/>

          <button className="submitButton" type="submit">Sign in</button>
        </>
      )}
    </form>
  );
}

export default LoginForm;
