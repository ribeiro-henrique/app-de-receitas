import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import context from '../context/myContext';

const searchTestId = 'search-input';
const btnTestId = 'exec-search-btn';
const firstTestId = 'first-letter-search-radio';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));
describe('SearchBar', () => {
  let historyMock;
  beforeEach(() => {
    historyMock = { location: { pathname: '/drinks' } };
    useHistory.mockReturnValue(historyMock);
  });
  test('chama drinkIngre e define os alimentos quando o tipo de busca é "ingrediente" e a página atual é "/drinks"', async () => {
    const drinkIngre = jest.fn().mockResolvedValue(['Drink 1', 'Drink 2']);
    const setFoods = jest.fn();
    const mockContextValue = {
      foods: [],
      setFoods,
    };
    render(
      <context.Provider value={ mockContextValue }>
        <SearchBar />
      </context.Provider>,
    );
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByTestId(searchTestId);
    const searchButton = screen.getByTestId(btnTestId);
    fireEvent.click(ingredientRadio);
    expect(ingredientRadio.checked).toBe(true);
    userEvent.type(searchInput, 'pizza');
    expect(searchInput.value).toBe('pizza');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(drinkIngre).toHaveBeenCalledTimes(1);
      expect(drinkIngre).toHaveBeenCalledWith('pizza');
      expect(setFoods).toHaveBeenCalledTimes(1);
      expect(setFoods).toHaveBeenCalledWith(['Drink 1', 'Drink 2']);
    });
  });
  test('chama searchByI e define os alimentos quando o tipo de busca é "ingrediente" e a página atual não é "/drinks"', async () => {
    const searchByI = jest.fn().mockResolvedValue(['Food 1', 'Food 2']);
    const setFoods = jest.fn();
    const mockContextValue = {
      foods: [],
      setFoods,
    };
    historyMock.location.pathname = '/foods';
    render(
      <context.Provider value={ mockContextValue }>
        <SearchBar />
      </context.Provider>,
    );
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByTestId(searchTestId);
    const searchButton = screen.getByTestId(btnTestId);
    fireEvent.click(ingredientRadio);
    expect(ingredientRadio.checked).toBe(true);
    userEvent.type(searchInput, 'pizza');
    expect(searchInput.value).toBe('pizza');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(searchByI).toHaveBeenCalledTimes(1);
      expect(searchByI).toHaveBeenCalledWith('pizza');
      expect(setFoods).toHaveBeenCalledTimes(1);
      expect(setFoods).toHaveBeenCalledWith(['Food 1', 'Food 2']);
    });
  });
  test('chama drinkName e define os alimentos quando o tipo de busca é "nome" e a página atual é "/drinks"', async () => {
    const drinkName = jest.fn().mockResolvedValue(['Drink 1', 'Drink 2']);
    const setFoods = jest.fn();
    const mockContextValue = {
      foods: [],
      setFoods,
    };
    render(
      <context.Provider value={ mockContextValue }>
        <SearchBar />
      </context.Provider>,
    );
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchInput = screen.getByTestId(searchTestId);
    const searchButton = screen.getByTestId(btnTestId);
    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);
    userEvent.type(searchInput, 'pizza');
    expect(searchInput.value).toBe('pizza');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(drinkName).toHaveBeenCalledTimes(1);
      expect(drinkName).toHaveBeenCalledWith('pizza');
      expect(setFoods).toHaveBeenCalledTimes(1);
      expect(setFoods).toHaveBeenCalledWith(['Drink 1', 'Drink 2']);
    });
  });
  test('chama searchByN e define os alimentos quando o tipo de busca é "nome" e a página atual não é "/drinks"', async () => {
    const searchByN = jest.fn().mockResolvedValue(['Food 1', 'Food 2']);
    const setFoods = jest.fn();
    const mockContextValue = {
      foods: [],
      setFoods,
    };
    historyMock.location.pathname = '/foods';
    render(
      <context.Provider value={ mockContextValue }>
        <SearchBar />
      </context.Provider>,
    );
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchInput = screen.getByTestId(searchTestId);
    const searchButton = screen.getByTestId(btnTestId);
    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);
    userEvent.type(searchInput, 'pizza');
    expect(searchInput.value).toBe('pizza');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(searchByN).toHaveBeenCalledTimes(1);
      expect(searchByN).toHaveBeenCalledWith('pizza');
      expect(setFoods).toHaveBeenCalledTimes(1);
      expect(setFoods).toHaveBeenCalledWith(['Food 1', 'Food 2']);
    });
  });
  test('chama drinkFirts e define os alimentos quando o tipo de busca é "primeira-letra" e a página atual é "/drinks"', async () => {
    const drinkFirts = jest.fn().mockResolvedValue(['Drink 1', 'Drink 2']);
    const setFoods = jest.fn();
    const mockContextValue = {
      foods: [],
      setFoods,
    };
    render(
      <context.Provider value={ mockContextValue }>
        <SearchBar />
      </context.Provider>,
    );
    const firstLetterRadio = screen.getByTestId(firstTestId);
    const searchInput = screen.getByTestId(searchTestId);
    const searchButton = screen.getByTestId(btnTestId);
    fireEvent.click(firstLetterRadio);
    expect(firstLetterRadio.checked).toBe(true);
    userEvent.type(searchInput, 'p');
    expect(searchInput.value).toBe('p');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(drinkFirts).toHaveBeenCalledTimes(1);
      expect(drinkFirts).toHaveBeenCalledWith('p');
      expect(setFoods).toHaveBeenCalledTimes(1);
      expect(setFoods).toHaveBeenCalledWith(['Drink 1', 'Drink 2']);
    });
  });
  test('chama searchByL e define os alimentos quando o tipo de busca é "primeira-letra" e a página atual não é "/drinks"', async () => {
    const searchByL = jest.fn().mockResolvedValue(['Food 1', 'Food 2']);
    const setFoods = jest.fn();
    const mockContextValue = {
      foods: [],
      setFoods,
    };
    historyMock.location.pathname = '/foods';
    render(
      <context.Provider value={ mockContextValue }>
        <SearchBar />
      </context.Provider>,
    );
    const firstLetterRadio = screen.getByTestId(firstTestId);
    const searchInput = screen.getByTestId(searchTestId);
    const searchButton = screen.getByTestId(btnTestId);
    fireEvent.click(firstLetterRadio);
    expect(firstLetterRadio.checked).toBe(true);
    userEvent.type(searchInput, 'p');
    expect(searchInput.value).toBe('p');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(searchByL).toHaveBeenCalledTimes(1);
      expect(searchByL).toHaveBeenCalledWith('p');
      expect(setFoods).toHaveBeenCalledTimes(1);
      expect(setFoods).toHaveBeenCalledWith(['Food 1', 'Food 2']);
    });
  });
  test('exibe um alerta quando não há alimentos encontrados', async () => {
    const setFoods = jest.fn();
    const mockContextValue = {
      foods: null,
      setFoods,
    };
    render(
      <context.Provider value={ mockContextValue }>
        <SearchBar />
      </context.Provider>,
    );
    const searchButton = screen.getByTestId(btnTestId);
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(setFoods).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });
  test('exibe um alerta quando a pesquisa tem mais de um caractere', async () => {
    const setFoods = jest.fn();
    const mockContextValue = {
      foods: [],
      setFoods,
    };
    render(
      <context.Provider value={ mockContextValue }>
        <SearchBar />
      </context.Provider>,
    );
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId(btnTestId);
    fireEvent.click(firstLetterRadio);
    expect(firstLetterRadio.checked).toBe(true);
    userEvent.type(searchInput, 'pizza');
    expect(searchInput.value).toBe('pizza');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(setFoods).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });
  test('redireciona para a página de detalhes quando há apenas um alimento encontrado', async () => {
    const setFoods = jest.fn();
    const mockContextValue = {
      foods: [{ idMeal: '1', strMeal: 'Meal 1' }],
      setFoods,
    };
    const historyMocks = {
      location: { pathname: '/drinks' },
      push: jest.fn(),
    };
    useHistory.mockReturnValue(historyMocks);
    render(
      <context.Provider value={ mockContextValue }>
        <SearchBar />
      </context.Provider>,
    );
    const searchButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(setFoods).not.toHaveBeenCalled();
      expect(historyMock.push).toHaveBeenCalledWith('/drinks/1');
    });
  });
  test('renders multiple recipe cards when there are more than one food items', () => {
    const foods = [
      { idMeal: '1', strMeal: 'Meal 1', strMealThumb: 'meal1.jpg' },
      { idMeal: '2', strMeal: 'Meal 2', strMealThumb: 'meal2.jpg' },
      { idMeal: '3', strMeal: 'Meal 3', strMealThumb: 'meal3.jpg' },
    ];

    const mockContextValue = {
      foods,
      setFoods: jest.fn(),
    };

    render(
      <context.Provider value={ mockContextValue }>
        <SearchBar />
      </context.Provider>,
    );

    const recipeCards = screen.getAllByTestId(/(\d+)-recipe-card/);

    expect(recipeCards).toHaveLength(3);

    expect(screen.getByAltText('Recipe')).toHaveAttribute('src', 'meal1.jpg');
    expect(screen.getByTestId('0-card-name')).toHaveTextContent('Meal 1');

    expect(screen.getByAltText('Recipe')).toHaveAttribute('src', 'meal2.jpg');
    expect(screen.getByTestId('1-card-name')).toHaveTextContent('Meal 2');

    expect(screen.getByAltText('Recipe')).toHaveAttribute('src', 'meal3.jpg');
    expect(screen.getByTestId('2-card-name')).toHaveTextContent('Meal 3');
  });
});
