import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRoute';

describe('Header', () => {
  test('Exibe o título correto na rota /meals', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.getByText(/meals/i)).toBeInTheDocument();

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');
  });

  test('Search Btn', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.getByText(/meals/i)).toBeInTheDocument();

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();

    userEvent.click(searchIcon);
    expect(searchBar).not.toBeInTheDocument();
  });

  test('Exibe o título correto na rota /drinks', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    expect(screen.getByText(/drinks/i)).toBeInTheDocument();
  });

  test('Exibe o título correto na rota /profile', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });

  test('Exibe o título correto na rota /done-recipes', () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    expect(screen.getByText(/done recipes/i)).toBeInTheDocument();
  });

  // test('Exibe o título correto na rota /favorite-recipes', () => {
  //   renderWithRouter(<App />, { initialEntries: [' /favorite-recipes'] });
  //   expect(screen.getByText(/favorite recipes/i)).toBeInTheDocument();
  // });
});
