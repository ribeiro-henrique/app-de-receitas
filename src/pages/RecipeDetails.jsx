import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Compartilhar from '../components/Compartilhar';
import Liked from '../components/Liked';
import Start from '../components/Start';

const SEIS = 6;
const LESS_ONE = -1;

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;
  const [receita, setReceita] = useState(null);
  const [, setDrinkRecomendados] = useState([]);
  const [, setComidasRecomendadas] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [video, setVideo] = useState('');

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(
        pathname.includes('meals')
          ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const data = await response.json();
      setReceita(data.meals?.[0] || data.drinks?.[0]);
    };

    const fetchRecommendations = async () => {
      const response = await fetch(
        pathname.includes('meals')
          ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
          : 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const data = await response.json();
      if (pathname.includes('meals')) {
        setDrinkRecomendados(data.drinks?.slice(0, SEIS) || []);
      } else {
        setComidasRecomendadas(data.meals?.slice(0, SEIS) || []);
      }
    };

    fetchRecipeDetails();
    fetchRecommendations();
  }, [pathname, id]);

  useEffect(() => {
    if (receita) {
      const keysIngredients = Object.keys(receita)
        .filter((element) => element.includes('Ingredient'));
      const keysMeasurements = Object.keys(receita)
        .filter((element) => element.includes('Measure'));

      const limiteDeIngredientes = 21;
      const limite = keysIngredients.findIndex(
        (element) => receita[element] == null || receita[element] === '',
      );

      const listaDeIngredientes = keysIngredients
        .slice(0, limite !== LESS_ONE ? limite : limiteDeIngredientes)
        .map((element, index) => [
          element,
          `${index}-ingredient-name-and-measure`,
          keysMeasurements[index],
        ]);

      setIngredientes(listaDeIngredientes);

      if (receita.strYoutube) {
        const ytVideo = receita.strYoutube;
        const finalVideo = `https://www.youtube.com/embed/${ytVideo.slice(
          ytVideo.indexOf('=') + 1,
        )}`;
        setVideo(finalVideo);
      }
    }
  }, [receita]);

  const renderRecipe = () => {
    if (!receita) return null;

    const {
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
      strDrinkThumb,
      strDrink,
      strAlcoholic,
    } = receita;

    return (
      <div>
        <div>
          <img
            data-testid="recipe-photo"
            src={ pathname.includes('meals') ? strMealThumb : strDrinkThumb }
            alt="foto da receita"
          />
          <h1
            data-testid="recipe-title"
          >
            {pathname.includes('meals') ? strMeal : strDrink}

          </h1>
          <p data-testid="recipe-category">
            {pathname.includes('meals')
              ? strCategory : `${strCategory} : ${strAlcoholic}`}
          </p>
          <Compartilhar pathname={ pathname } history={ history } />
          <Liked receita={ receita } />
        </div>
        <div>
          <h2 data-testid="recipe-category">Ingredients</h2>
          {ingredientes.map((element, index) => (
            <li key={ index } data-testid={ element[1] }>
              {`${receita[element[0]]}:${receita[element[2]]}`}
            </li>
          ))}
        </div>
        <div>
          <h2 data-testid="recipe-category">Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <div>
          <iframe
            data-testid="video"
            title="Video"
            width="420"
            height="315"
            src={ video }
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderRecipe()}
      {receita && (
        <Start
          type={ pathname.includes('meals') ? 'meals' : 'drinks' }
          id={ receita.idMeal || receita.idDrink }
          history={ history }
        />
      )}
    </div>
  );
}

export default React.memo(RecipeDetails);
