import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Context from '../context/MyContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function Liked({ receita }) {
  const { favorites, addFavorite, removeFavoriteById } = useContext(Context);

  const id = receita.idMeal || receita.idDrink;
  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavoriteById(id);
    } else {
      const favorite = {
        id,
        type: receita.idMeal ? 'meal' : 'drink',
        nationality: receita.strArea || '',
        category: receita.strCategory,
        alcoholicOrNot: receita.strAlcoholic || '',
        name: receita.strMeal || receita.strDrink,
        image: receita.strMealThumb || receita.strDrinkThumb,
      };
      addFavorite(favorite);
    }
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn-wrapper"
      onClick={ handleFavoriteClick }
      style={ { cursor: 'pointer' } }
    >
      <img
        data-testid="favorite-btn"
        style={ { width: '20px', height: '20px' } }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
      />
    </button>
  );
}

Liked.propTypes = {
  receita: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

export default React.memo(Liked);
