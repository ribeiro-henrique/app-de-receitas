import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Context from '../context/MyContext';

function FavoriteRecipes() {
  const { favorites } = useContext(Context);
  const [filterType, setFilterType] = useState('');

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const filteredRecipes = favorites.filter((recipe) => (filterType
    ? recipe.type?.startsWith(filterType) : true));

  return (
    <>
      <Header title="Favorite Recipes" iconeProfile />

      <button onClick={ () => handleFilter('') } data-testid="filter-by-all-btn">
        All
      </button>

      <button onClick={ () => handleFilter('meal') } data-testid="filter-by-meal-btn">
        Meals
      </button>

      <button onClick={ () => handleFilter('drink') } data-testid="filter-by-drink-btn">
        Drinks
      </button>

      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((favorite) => (
          <RecipeCard
            key={ favorite.id }
            recipe={ favorite }
            image={ favorite.image }
            name={ favorite.name }
            date={ favorite.doneDate }
            tags={ favorite.tags }
            type={ favorite.type }
            id={ favorite.id }
            categoria={ `${favorite.nationality}
            - ${favorite.category} - ${favorite.alcoholicOrNot}` }
          />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </>
  );
}

export default React.memo(FavoriteRecipes);
