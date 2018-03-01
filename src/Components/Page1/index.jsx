import React from 'react';
// import PropTypes from 'prop-types';
import './index.css';

const Page1 = props => (
  <div className="Page1-container">
    <div className="Page1-box">
      <div className="left-pane">
        <p className="welcome">Welcome </p>
        <p className="to">to</p>
        <p className="quiz">Quizzy!</p>

      </div>
      <div className="right-pane">
        <p>Login</p>
        <label className="login-username">Username</label>
        <input type="text" className="input" onChange={event => props.userNameEntered(event)} />
        <button className="login-button" onClick={() => { props.login(); }}>Login</button>
      </div>
    </div>
  </div>
);

// NoBooks.propTypes = {
//   onSync: PropTypes.func.isRequired,
// };

export default Page1;
