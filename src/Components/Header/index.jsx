import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Header = props => (
  <div className="Header">
    <header className="Header-heading">
      {props.title}
    </header>
    <span className="Hello">{props.hello} {props.name}</span>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: '',
};

export default Header;
