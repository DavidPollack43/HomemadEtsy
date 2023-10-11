import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch, { restoreCSRF } from './store/csrf';
import { openModal, closeModal } from './store/modal_reducer';
import * as sessionActions from './store/session.js';



  const store = configureStore();
  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
    window.closeModal = closeModal;
    window.openModal = openModal;
    window.sessionActions = sessionActions;
    window.csrfFetch = csrfFetch
  }

  function Root() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }

  const renderApplication = () => {
    ReactDOM.render(
      <React.StrictMode>
        <Root />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

if (sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("currentUser") === null) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}