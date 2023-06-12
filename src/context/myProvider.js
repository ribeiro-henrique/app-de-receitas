import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import context from './myContext';

function MyProvider({ children }) {
  const [foods, setFoods] = useState([]);

  const contextValue = useMemo(() => ({
    foods,
    setFoods,
  }), [foods, setFoods]);

  // pensei em colocar o global.alert aqui

  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
