import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import React from 'react';
import renderWithRouter from '../helpers/RenderWithRoute';
import meals from '../../cypress/mocks/meals';
import App from '../App';

describe('Trying to get the max tests coverage', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    // aqui abaixo eu vou, de fato, renderizar meu app
    renderWithRouter(<App />);

    // afterEach(() => {
    //   global.fetch.mockRestore();
    // });
  });
  test('aaa', async () => {
    const history = createMemoryHistory({ initialEntries: ['/meals/52977'] });

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    expect(history.location.pathname).toBe('/meals/52977');

    await new Promise((resolve) => {
      setTimeout(resolve, 300);

      const corba = screen.getByRole('heading', {
        name: /corba/i,
      });
      expect(corba).toBeInTheDocument();

      const heart = screen.getByRole('img', {
        name: /favorite/i,
      });
      userEvent.click(heart);

      const share = screen.getByRole('img', {
        name: /share/i,
      });
      userEvent.click(share);

      const ingre = screen.getByRole('heading', {
        name: /ingredients/i,
      });
      expect(ingre).toBeInTheDocument();
    });

    const ab = screen.getByRole('heading', {
      name: /instructions/i,
    });
    expect(ab).toBeInTheDocument();
  });

  test('Test API call to thecocktaildb', async () => {
    const history = createMemoryHistory({ initialEntries: ['/drinks/15997'] });

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    // Wait for the API call to be made and the data to be loaded
    await screen.findByText(/Test Cocktail/i);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997',
    );
    expect(screen.getByTestId('recipe-title')).toHaveTextContent('Test Cocktail');
  });
});
