import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRoute';

describe('Testa o componente Profile', () => {
  test('Verifica se ao clicar no botão dos Drinks, o usuário é redirecionado para a aba de drinks', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const profileIcon = screen.getByTestId('profile-top-btn');
    act(() => {
      userEvent.click(profileIcon);
    });
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();

    const doneBtn = screen.getByTestId('profile-done-btn');
    expect(doneBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');

    userEvent.click(profileIcon);
    userEvent.click(favoriteBtn);
  });
});
