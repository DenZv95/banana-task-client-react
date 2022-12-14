import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Input.module.scss';

const Input = ({ id, className, placeholder, required, type, ...attrs }) => {
  const classes = classNames(styles.input, className);
  return (
    <input
      name={id}
      id={id}
      placeholder={placeholder}
      type={type}
      // value={email}
      className={classes}
      // onChange={(e) => {
      //   setEmail(e.target.value);
      // }}
      {...attrs}
    />
  );
};

Input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  className: '',
  required: false,
};

export default Input;
