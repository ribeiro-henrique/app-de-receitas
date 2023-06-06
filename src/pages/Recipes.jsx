import React, { useEffect } from 'react';
import Header from '../components/Header';

import { useHeader } from '../context/HeaderContext';

function Recipes() {
  const { setTitle, setShowSearchIcon } = useHeader();

  useEffect(() => {
    setTitle('Meals');
    setShowSearchIcon(true);

    return () => {
      setTitle('');
      setShowSearchIcon(false);
    };
  }, [setTitle, setShowSearchIcon]);

  return (
    <div>
      <Header />

    </div>
  );
}

export default Recipes;
