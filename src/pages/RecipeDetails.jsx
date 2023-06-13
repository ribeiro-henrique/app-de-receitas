import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function RecipeDetails() {
  const [comida, setComida] = useState([]);
  const [bebida, setBebida] = useState([]);

  const location = useLocation(); // tem o endereço da rota

  // usar UseParams

  // Captura os IDs do localStorage
  // const mealId = JSON.parse(localStorage.getItem('mealId'));
  // const drinkId = JSON.parse(localStorage.getItem('drinkId'));

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const mealData = await mealResponse.json();
      setComida(mealData.meals);

      const drinkResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
      const drinkData = await drinkResponse.json();
      setBebida(drinkData.drinks.slice(0));
    };

    fetchRecipeDetails();
  }, [mealId, drinkId]);

  return (
    <div>
      <Header title="RecipeDetails" />
      <h1>Meals</h1>
      {comida.map((e, index) => (
        <img
          key={ index }
          src={ e.strMealThumb }
          alt={ e.strMeal }
        />
      ))}
    </div>
  );
}
