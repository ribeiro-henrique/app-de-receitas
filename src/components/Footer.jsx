import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();
  const redirectDrinkClick = () => {
    history.push('./drinks');
  };
  const redirectMeals = () => {
    history.push('./meals');
  };
  return (
    <div className="footer my-footer" data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        onClick={ redirectDrinkClick }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="Drink Icon" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        onClick={ redirectMeals }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="Meal Icon" />
      </button>
    </div>
  );
}
export default Footer;
