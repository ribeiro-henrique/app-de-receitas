import React from 'react';
import myContext from './myContext';

function myProvider({ children }) {
  // const [state, setState] = useState('Olá, mundo!');
  return (
    <myContext.Provider value={ { state } }>
      { children }
    </myContext.Provider>
  );
}

export default myProvider;
