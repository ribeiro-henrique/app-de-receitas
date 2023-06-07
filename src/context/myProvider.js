/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import context from './myContext';

function MyProvider({ children }) {
  const [foods, setFoods] = useState([]);

  const contextValue = {
    foods,
    setFoods,
  };

  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
  foods: PropTypes.array.isRequired,
  setFoods: PropTypes.func.isRequired,
};

export default MyProvider;
