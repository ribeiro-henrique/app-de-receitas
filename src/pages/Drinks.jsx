import React, { useEffect } from 'react';
import { useHeader } from '../context/HeaderContext';
import Recipes from './Recipes';

function Drinks() {
  const { setTitle, setShowSearchIcon } = useHeader();

  useEffect(() => {
    setTitle('Drinks');
    setShowSearchIcon(true);

    return () => {
      setTitle('');
      setShowSearchIcon(false);
    };
  }, [setTitle, setShowSearchIcon]);

  return (
    <div>

      <Recipes />

    </div>
  );
}

export default Drinks;
