import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import drinksCat from '../../cypress/mocks/drinkCategories';
import foodCategory from '../../cypress/mocks/mealCategories';
import App from '../App';
import renderWithRouter from '../helpers/RenderWithRoute';
import Recipes from '../pages/Recipes';

const debugUm = 'search-top-btn';
const debugDois = 'search-input';
const debugTres = 'exec-search-btn';
describe('Testes do componente Recipes', () => {
  beforeEach(() => {
    localStorage.user = {
      email: 'hesr.ribeiro@gmail.com',
    };
  });

  describe('Recipes', () => {
    it('Renderiza o recipes', async () => {
      renderWithRouter(<Recipes />);
    });
  });

  test('Verifica se o global alert vem quando digito algo que nao está previsto', async () => {
    const history = createMemoryHistory({ initialEntries: ['/meals'] });
    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    expect(history.location.pathname).toBe('/meals');
    const img = screen.getByTestId(debugUm);
    userEvent.click(img);
    const input = screen.getByTestId(debugDois);
    userEvent.type(input, 'lucas');
    const first = screen.getByTestId('ingredient-search-radio');
    userEvent.click(first);
    const search = screen.getByTestId(debugTres);
    userEvent.click(search);
    expect(global.alert).toHaveBeenCalledTimes(1);
    // Restaura a implementação original do alert após o teste
    alertMock.mockRestore();
  });
  test('Verifica a pesquisa de Corba', async () => {
    const history = createMemoryHistory({ initialEntries: ['/meals'] });
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    expect(history.location.pathname).toBe('/meals');
    const img = screen.getByTestId(debugUm);
    userEvent.click(img);
    const input = screen.getByTestId(debugDois);
    userEvent.type(input, 'corba');
    const first = screen.getByTestId('name-search-radio');
    userEvent.click(first);
    const search = screen.getByTestId(debugTres);
    userEvent.click(search);
    expect(history.location.pathname).toBe('/meals/52977');
    // Restaura a implementação original do alert após o teste
  });
  test('Verifica a pesquisa de Smut', async () => {
    const history = createMemoryHistory({ initialEntries: ['/drinks'] });
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    expect(history.location.pathname).toBe('/drinks');
    const img = screen.getByTestId(debugUm);
    userEvent.click(img);
    const input = screen.getByTestId(debugDois);
    userEvent.type(input, 'smut');
    const first = screen.getByTestId('name-search-radio');
    userEvent.click(first);
    const search = screen.getByTestId(debugTres);
    userEvent.click(search);
    expect(history.location.pathname).toBe('/drinks/17141');
    // Restaura a implementação original do alert após o teste
    alertMock.mockRestore();
  });

  test('Teste de pesquisa vazia', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ meals: [] }),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
    });

    const errorMessage = 'Sorry, we haven\'t found any recipes for these filters.';
    expect(global.alert).toHaveBeenCalledWith(errorMessage);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals');
    global.fetch.mockClear();
  });

  test('Teste de pesquisa com resultados encontrados', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(foodCategory),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'chicken');
    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      const chickenImg = screen.getByRole('img', { name: /corba/i });
      expect(chickenImg).toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /beef and mustard pie/i })).not.toBeInTheDocument();
      expect(history.location.pathname).toBe('/meals');
    });
    global.fetch.mockClear();
  });

  test('Teste de redirecionamento para a página de produto', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ meals: [{ idMeal: '1' }] }),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'pizza');
    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/1');
      expect(history.location.state).toBe('meal');
    });
    global.fetch.mockClear();
  });

  test('Teste de seleção de categoria de refeição', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(foodCategory),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const beef = screen.getByTestId('Beef-category-filter');
    userEvent.click(beef);
    await waitFor(() => {
      const torta = screen.getByRole('img', { name: /beef and mustard pie/i });
      const corba = screen.getByRole('img', { name: /corba/i });
      expect(torta).toBeInTheDocument();
      expect(corba).toBeInTheDocument();
      expect(history.location.pathname).toBe('/meals');
    });
    global.fetch.mockClear();
  });

  test('Teste de seleção de categoria de bebida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(drinksCat),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const ordinary = screen.getByTestId('Ordinary Drink-category-filter');
    userEvent.click(ordinary);
    await waitFor(() => {
      const ginFizz = screen.getByRole('img', { name: /gin fizz/i });
      const ginRickey = screen.getByRole('img', { name: /gin rickey/i });
      expect(ginFizz).toBeInTheDocument();
      expect(ginRickey).toBeInTheDocument();
      expect(history.location.pathname).toBe('/drinks');
    });
    global.fetch.mockClear();
  });

  test('Teste de pesquisa de bebida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ drinks: [] }),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'vodka');
    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(history.location.pathname).toBe('/drinks');
    });
    global.fetch.mockClear();
  });

  test('Teste de busca sem resultados', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'nonexistent');
    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      expect(history.location.pathname).toBe('/meals');
    });
    global.fetch.mockClear();
  });
});
