import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import SignupFormModal from "../SignUpFormModal";

function LoginForm({showModal, setShowModal}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const [showSignup, setShowSignup] = useState(false);
  // const [showLogin, setShowLogin] = useState(true);

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
    // setShowSignup(true);
    setShowModal("signup")
  }

  const handleDemoClick = (e) =>{
    e.preventDefault();
    const demo = {
      credential: 'Demo-lition', 
      password: 'password'
    }
    dispatch(sessionActions.login(demo))
  }

  return (
      <div className="modalContainer">
      {
      <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <h2 className="SignIn">Sign in</h2>
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
              className="input"
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
              className="input"
              required
            />
          </label>

          <br/>
          <br/>
          <button className="submitButton" type="submit">Sign in</button>
        </form>
      }
      <br/>
      <button className="submitButton" onClick={handleDemoClick}>Demo User</button>
      </div>
  );
}

export default LoginForm;
