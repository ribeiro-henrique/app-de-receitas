import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRoute';

const favRecipes = [
  { id: '53060',
    type: 'meal',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    name: 'Burek',
    nationality: 'Croatian',
    category: 'Side',
    alcoholicOrNot: '' },
  {
    id: '53065',
    type: 'meal',
    image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    name: 'Sushi',
    nationality: 'Japanese',
    category: 'Seafood',
    alcoholicOrNot: '' },
];

describe('Trying to get the final coverage guys', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(favRecipes));

    renderWithRouter(<App />);
  });
  afterEach(() => jest.restoreAllMocks());

  test('aaa', async () => {
    const history = createMemoryHistory({ initialEntries: ['/done-recipes'] });

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const title = screen.getByTestId('page-title');
    expect(title).toBeVisible();
    expect(title).toHaveTextContent('Done Recipes');

    const allBtn = screen.getByTestId('filter-by-all-btn');
    expect(allBtn).toBeVisible();
    userEvent.click(allBtn);

    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    expect(mealBtn).toBeVisible();
    userEvent.click(mealBtn);

    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(drinkBtn).toBeVisible();
    userEvent.click(drinkBtn);
  });
});

// await new Promise((resolve) => {
//   setTimeout(resolve, 300);
// });
// expect(history.location.pathname).toBe('/meals/52977/in-progress');
// await new Promise((resolve) => {
//   setTimeout(resolve, 300);

//   userEvent.click(screen.getByRole('checkbox', {
//     name: /lentils/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /onion/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /carrots/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /tomato puree/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /cumin/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /paprika/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /mint/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /thyme/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /black pepper/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /red pepper flakes/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /vegetable stock/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /water/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /sea salt/i,
//   }));
//   userEvent.click(screen.getByRole('checkbox', {
//     name: /sea salt/i,
//   }));
//   expect(history.location.pathname).toBe('/done-recipes');
