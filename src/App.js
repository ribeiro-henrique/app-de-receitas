import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HeaderProvider } from './context/HeaderContext';
import './App.css';
import Login from './components/Login';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import Drinks from './components/Drinks';

function App() {
  return (
    <HeaderProvider>
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => (<Login
            { ...props }
          />) }
        />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/drinks/:id-da-receita" component={ RecipeDetails } />
        <Route path="/meals/:id-da-receita" component={ RecipeDetails } />
        <Route path="/meals/:id-da-receita/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id-da-receita/in-progress" component={ RecipeInProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </HeaderProvider>
  );
}

export default App;
