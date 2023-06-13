import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useHeader } from '../context/HeaderContext';
import context from '../context/myContext';
import { allDrinks, allMeals, dCFetch, getCat, mCFetch } from '../services/FetchApi';
import './Recipes.css';

// tasks necessárias 13/06 - terça:
// arrumar a quantidade de el que renderiza ao pesquisar no searchBar
// lançar o global.alert (talvez no provider)
// criar o arquivo de mock para testar o Recipes
// verificar os arrays de dependência dos useEffect

export default function Recipes() {
  const { setTitle, setShowSearchIcon } = useHeader();
  // const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState([]);
  const [specificCategory, setSpecificCategory] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const { foods, setFoods } = useContext(context);

  const maxLength = 12;
  const maxCategory = 5;
  const history = useHistory();

  const getRecipes = useCallback(async () => {
    if (history.location.pathname === '/meals') {
      const meals = await allMeals();
      const twelveMeals = meals.meals.slice(0, maxLength);
      setFoods(twelveMeals || []);
    } else if (history.location.pathname === '/drinks') {
      const drinks = await allDrinks();
      const twelveDrinks = drinks.drinks.slice(0, maxLength);
      setFoods(twelveDrinks || []);
    }
  }, [history.location.pathname]);
  const fetchCategories = useCallback(async () => {
    if (history.location.pathname === '/meals') {
      const categories = await mCFetch();
      const fiveCategories = categories.meals.slice(0, maxCategory);
      setCategory(fiveCategories);
    } else if (history.location.pathname === '/drinks') {
      const categories = await dCFetch();
      const fiveCategories = categories.drinks.slice(0, maxCategory);
      setCategory(fiveCategories);
    }
  }, [history.location.pathname]);
  const serverParameter = useCallback(() => {
    if (history.location.pathname === '/meals') {
      const server = 'themealdb';
      return server;
    }
    if (history.location.pathname === '/drinks') {
      const server = 'thecocktaildb';
      return server;
    }
  }, [history.location.pathname]);
  const fetchCategory = useCallback(
    async (categoryName) => {
      if (categoryName === specificCategory) {
        setSpecificCategory('');
        if (isFilterActive) {
          setIsFilterActive(false);
        }
        return;
      }
      setSpecificCategory(categoryName);
      if (!isFilterActive) {
        setIsFilterActive(true);
      }
      const categories = await getCat(serverParameter(), categoryName);
      if (history.location.pathname === '/meals') {
        const categoryRecipes = categories.meals.slice(0, maxLength);
        setFoods(categoryRecipes);
      } else if (history.location.pathname === '/drinks') {
        const categoryRecipes = categories.drinks.slice(0, maxLength);
        setFoods(categoryRecipes);
      }
    },
    [specificCategory, setSpecificCategory, isFilterActive,
      serverParameter, history.location.pathname],
  );
  useEffect(() => {
    setTitle('Meals');
    setShowSearchIcon(true);
    return () => {
      setTitle('');
      setShowSearchIcon(false);
    };
  }, [setTitle, setShowSearchIcon]);
  useEffect(() => {
    getRecipes();
    fetchCategories();
  }, [getRecipes, fetchCategories]);
  useEffect(() => {
    if (!isFilterActive && !specificCategory) {
      getRecipes();
    }
  }, [isFilterActive, specificCategory, getRecipes]);
  return (
    <div>
      <Header />
      <h1>Recipes</h1>
      <div>
        {category.map((e) => (
          <div key={ e.strCategory }>
            <button
              type="button"
              data-testid={ `${e.strCategory}-category-filter` }
              onClick={ () => fetchCategory(e.strCategory) }
            >
              {e.strCategory}
            </button>
          </div>
        ))}
      </div>
      <button data-testid="All-category-filter" onClick={ getRecipes }>
        All
      </button>
      {isFilterActive ? (
        <div>
          {foods.map((e, index) => (
            <div
              className="recipe-card"
              key={ e.idMeal || e.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <h2
                className="card-name"
                data-testid={ `${index}-card-name` }
              >
                {e.strMeal || e.strDrink}

              </h2>
              {history.location.pathname === '/meals' ? (
                <Link to={ `/meals/${e.idMeal}` }>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ e.strMealThumb }
                    alt={ e.strMeal }
                  />
                </Link>
              ) : (
                <Link to={ `/drinks/${e.idDrink}` }>
                  <img
                    className="card-img"
                    data-testid={ `${index}-card-img` }
                    src={ e.strDrinkThumb }
                    alt={ e.strDrink }
                  />
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {history.location.pathname === '/meals' ? (
            <div>
              {foods.map((e, index) => (
                <div
                  className="recipe-card"
                  key={ e.idMeal }
                  data-testid={ `${index}-recipe-card` }
                >
                  <h2
                    className="card-name"
                    data-testid={ `${index}-card-name` }
                  >
                    {e.strMeal}

                  </h2>
                  <Link to={ `/meals/${e.idMeal}` }>
                    <img
                      className="card-img"
                      data-testid={ `${index}-card-img` }
                      src={ e.strMealThumb }
                      alt={ e.strMeal }
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {foods.map((e, index) => (
                <div
                  className="recipe-card"
                  key={ e.idDrink }
                  data-testid={ `${index}-recipe-card` }
                >
                  <h2
                    className="card-name"
                    data-testid={ `${index}-card-name` }
                  >
                    {e.strDrink}

                  </h2>
                  <Link to={ `/drinks/${e.idDrink}` }>
                    <img
                      className="card-img"
                      data-testid={ `${index}-card-img` }
                      src={ e.strDrinkThumb }
                      alt={ e.strDrink }
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
