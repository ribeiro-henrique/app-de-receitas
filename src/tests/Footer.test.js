import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Footer from '../components/Footer';
import renderWithRouter from '../helpers/RenderWithRoute';

describe('Testa o componente Footer', () => {
  test('Verifica se ao clicar no botão dos Drinks, o usuário é redirecionado para a aba de drinks', () => {
    const { history } = renderWithRouter(<App />);
    const drinkIcon = screen.getByAltText('Drink Icon');
    act(() => {
      userEvent.click(drinkIcon);
    });
    expect(history.location.pathname).toBe('/drinks');
  });
  test('Verifica se ao clicar no botão dos Meals, o usuário é redirecionado para a aba de meals', () => {
    const { history } = renderWithRouter(<App />);
    const mealsIcon = screen.getByAltText('Meal Icon');
    act(() => {
      userEvent.click(mealsIcon);
    });
    expect(history.location.pathname).toBe('/meals');
  });
  test('Verifica se os botões estão presentes no componente Footer', () => {
    renderWithRouter(<Footer />);
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    expect(mealsButton).toBeInTheDocument();
  });
  test('Verifica se a função redirectDrinkClick redireciona corretamente para a aba de drinks', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    act(() => {
      userEvent.click(drinksButton);
    });
    expect(history.location.pathname).toBe('/drinks');
  });
  test('Verifica se a função redirectMeals redireciona corretamente para a aba de meals', () => {
    const { history } = renderWithRouter(<Footer />);
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    act(() => {
      userEvent.click(mealsButton);
    });
    expect(history.location.pathname).toBe('/meals');
  });
});
