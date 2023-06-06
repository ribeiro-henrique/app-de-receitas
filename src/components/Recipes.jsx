import React, { useEffect } from 'react';
import { useHeader } from '../context/HeaderContext';
import Header from './Header';

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
