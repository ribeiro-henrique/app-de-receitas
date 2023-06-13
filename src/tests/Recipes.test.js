import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import drinksCat from '../../cypress/mocks/drinkCategories';
import foodCategory from '../../cypress/mocks/mealCategories';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRoute';

describe('Testes do componente Recipes', () => {
  beforeEach(() => {
    localStorage.user = {
      email: 'hesr.ribeiro@gmail.com',
    };
  });
  test('Teste de seleção de categoria de refeição', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(foodCategory),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    expect(history.location.pathname).toBe('/meals');

    const beef = screen.getByTestId('Beef-category-filter');
    userEvent.click(beef);
    // expect(fetchCategory).toHaveBeenCalledWith('Beef');
    const torta = screen.getByRole('img', {
      name: /beef and mustard pie/i,
    });
    const corba = screen.getByRole('img', {
      name: /corba/i,
    });
    expect(torta).toBeInTheDocument();
    expect(corba).not.toBeInTheDocument();

    userEvent.click(beef);
    expect(torta).not.toBeInTheDocument();
    expect(corba).toBeInTheDocument();

    expect(history.location.pathname).toBe('/meals');
    const breakfast = screen.getByTestId('Breakfast-category-filter');
    userEvent.click(breakfast);
    expect(history.location.pathname).toBe('/meals');
    const chicken = screen.getByTestId('Chicken-category-filter');
    userEvent.click(chicken);
    expect(history.location.pathname).toBe('/meals');
    global.fetch.mockClear();
  });
  test('Teste de seleção de categoria de bebida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(drinksCat),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    expect(history.location.pathname).toBe('/drinks');
    const ordinary = screen.getByTestId('Ordinary Drink-category-filter');
    userEvent.click(ordinary);
    expect(history.location.pathname).toBe('/drinks');
    const cocktail = screen.getByTestId('Cocktail-category-filter');
    userEvent.click(cocktail);
    expect(history.location.pathname).toBe('/drinks');
    const shake = screen.getByTestId('Shake-category-filter');
    userEvent.click(shake);
    expect(history.location.pathname).toBe('/drinks');
    global.fetch.mockClear();
  });
  test('Teste de seleção da categoria "All" de refeição', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(foodCategory),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    expect(history.location.pathname).toBe('/meals');
    const allBtn = screen.getByTestId('All-category-filter');
    userEvent.click(allBtn);
    expect(history.location.pathname).toBe('/meals');
    global.fetch.mockClear();
  });
});
