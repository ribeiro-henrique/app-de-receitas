import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRoute';

const profileDone = 'profile-done-btn';
const profileEmail = 'profile-email';
const pageTitle = 'page-title';
const favoriteProfile = 'profile-favorite-btn';

describe('Testa o componente Profile', () => {
  test('Verifica se ao clicar no botão dos Drinks, o usuário é redirecionado para a aba de drinks', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const profileIcon = screen.getByTestId(profileDone);
    act(() => {
      userEvent.click(profileIcon);
    });

    expect(history.location.pathname).toBe('/profile');
    expect(screen.getByTestId(profileEmail)).toBeInTheDocument();
    expect(screen.getByTestId(pageTitle)).toBeInTheDocument();

    const doneBtn = screen.getByTestId(profileDone);
    expect(doneBtn).toBeInTheDocument();
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');

    const favoriteBtn = screen.getByTestId(favoriteProfile);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    expect(localStorage.clear).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se ao clicar no botão de perfil, o usuário permanece na mesma página', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const profileIcon = screen.getByTestId('profile-top-btn');
    act(() => {
      userEvent.click(profileIcon);
    });

    expect(history.location.pathname).toBe('/profile');
    expect(screen.getByTestId(profileEmail)).toBeInTheDocument();
    expect(screen.getByTestId(pageTitle)).toBeInTheDocument();

    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');
    expect(screen.getByTestId(profileEmail)).toBeInTheDocument();
    expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão de logout, o usuário é redirecionado para a página inicial', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    act(() => {
      userEvent.click(logoutBtn);
    });

    expect(localStorage.clear).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se o título da página é atualizado corretamente', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    console.log(history);

    const profileIcon = screen.getByTestId('profile-top-btn');
    act(() => {
      userEvent.click(profileIcon);
    });

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Profile');

    const doneBtn = screen.getByTestId(profileDone);
    act(() => {
      userEvent.click(doneBtn);
    });

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Done Recipes');

    const favoriteBtn = screen.getByTestId(favoriteProfile);
    act(() => {
      userEvent.click(favoriteBtn);
    });

    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Favorite Recipes');
  });

  test('Verifica se o email do usuário é exibido corretamente', () => {
    const storedUserEmail = JSON.stringify({ email: 'test@example.com' });
    localStorage.setItem('user', storedUserEmail);

    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const profileEmailTest = screen.getByTestId(profileEmail);
    expect(profileEmailTest).toBeInTheDocument();
    expect(profileEmailTest).toHaveTextContent('Email: test@example.com');
  });

  test('Verifica se ao clicar no botão de favoritos, o usuário é redirecionado para a página de favoritos', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const favoriteBtn = screen.getByTestId(favoriteProfile);
    act(() => {
      userEvent.click(favoriteBtn);
    });

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
