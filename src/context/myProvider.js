/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import context from './myContext';

function myProvider({ children }) {
  const [foods, setFoods] = useState(null);

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
export default myProvider;
