import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useHeader } from '../context/HeaderContext';

function FavoriteRecipes() {
  const history = useHistory();
  const { title, setTitle, setShowSearchIcon, profileIcon } = useHeader();

  useEffect(() => {
    setTitle('Favorite Recipes');
    setShowSearchIcon(true);

    return () => {
      setTitle('');
      setShowSearchIcon(false);
    };
  }, [setTitle, setShowSearchIcon]);

  const handleProfileClick = () => {
    history.push('/profile'); // Redireciona para a rota de perfil
  };

  return (
    <div>
      <button
        onClick={ handleProfileClick }
      >
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

export default FavoriteRecipes;
