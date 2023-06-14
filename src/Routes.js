import { Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
import MyProvider from './context/MyProvider';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Recipes from './pages/Recipes';

export default function Routes() {
  return (
    <MyProvider>
      <Switch>
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </MyProvider>
  );
}
