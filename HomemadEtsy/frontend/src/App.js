import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from './components/LoginForm/index';
import SignupFormPage from './components/SignupFormPage/index';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
