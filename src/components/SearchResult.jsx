import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeCard from './RecipeCard';

function SearchResultWrapped({ recipes }) {
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <div>
      {/* Renderiza a lista de receitas de acordo com o tipo de rota */}
      {pathname.includes('meals') ? (
        /* Se a rota inclui "meals", renderiza as receitas de refeições */
        recipes?.map((element, index) => (
          <Link key={ index } to={ `/meals/${element.idMeal}` }>
            {/* Cria um link para a página da receita específica */}
            <RecipeCard
              index={ index }
              name={ element.strMeal }
              image={ element.strMealThumb }
            />
          </Link>
        ))
      ) : (
        /* Caso contrário, renderiza as receitas de bebidas */
        recipes?.map((element, index) => (
          <Link key={ index } to={ `/drinks/${element.idDrink}` }>
            {/* Cria um link para a página da receita específica */}
            <RecipeCard
              index={ index }
              name={ element.strDrink }
              image={ element.strDrinkThumb }
            />
          </Link>
        ))
      )}
    </div>
  );
}

SearchResultWrapped.propTypes = {}.isRequired;

export const SearchResult = React.memo(SearchResultWrapped);
