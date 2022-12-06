import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const useDebounce = (value, delay) => {
  const [debValue, setValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debValue;
};

useDebounce.propTypes = {
  value: PropTypes.any,
  delay: PropTypes.number,
};

useDebounce.defaultProps = {
  delay: 0,
};
