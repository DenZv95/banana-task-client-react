import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Button.module.scss';

const Button = ({
  children,
  onClick,
  className,
  disabled,
  onOfTest,
  ...attrs
}) => {
  const classes = classNames(styles.button, className);
  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...attrs}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  onOfTest: PropTypes.oneOf(['News', 'Photos']),
};

Button.defaultProps = {
  children: 'Default button',
  onClick: () => {},
  className: '',
  disabled: false,
  onOfTest: 'News',
};

export default Button;
