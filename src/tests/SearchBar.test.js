import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SearchBar, { getEndpoint } from '../components/SearchBar';
import App from '../App';

const input = 'search-input';
const radio = 'name-search-radio';
const button = 'exec-search-btn';

describe('Testing getEndpoint function', () => {
  it('should return the correct endpoint for food searches', () => {
    expect(getEndpoint(true, 'ingredient', 'chicken')).toBe(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken',
    );

    expect(getEndpoint(true, 'first-letter', 'a')).toBe(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
    );
  });

  it('should return the correct endpoint for drink searches', () => {
    expect(getEndpoint(false, 'ingredient', 'vodka')).toBe(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka',
    );
    expect(getEndpoint(false, 'name', 'margarita')).toBe(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita',
    );
    expect(getEndpoint(false, 'first-letter', 'm')).toBe(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m',
    );
  });

  it('should throw an error for invalid search option', () => {
    expect(() => getEndpoint(true, 'invalid-option', 'param')).toThrow(
      'No search option selected',
    );
  });
});

describe('Testing SearchBar component', () => {
  const setPesquisaMock = jest.fn();

  beforeEach(() => {
    render(<SearchBar setPesquisa={ setPesquisaMock } />);
  });

  it('should update the search term when typing in the input field', () => {
    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'pizza' } });
    expect(searchInput.value).toBe('pizza');
  });

  it('should update the search option when selecting a radio button', () => {
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(radio);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    fireEvent.click(ingredientRadio);
    expect(ingredientRadio.checked).toBe(true);

    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);

    fireEvent.click(firstLetterRadio);
    expect(firstLetterRadio.checked).toBe(true);
  });

  it('should call the setPesquisa function with the correct search term and endpoint when submitting the form', () => {
    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'pizza' } });

    const nameRadio = screen.getByTestId(radio);
    fireEvent.click(nameRadio);

    const searchForm = screen.getByTestId('search-bar');
    fireEvent.submit(searchForm);

    expect(setPesquisaMock).toHaveBeenCalledWith({
      search: 'pizza',
      endpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=pizza',
    });
  });

  it('should call the setPesquisa function with the correct search term and endpoint when clicking the search button', () => {
    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'pizza' } });

    const nameRadio = screen.getByTestId(radio);
    fireEvent.click(nameRadio);

    const searchButton = screen.getByTestId(button);
    fireEvent.click(searchButton);

    expect(setPesquisaMock).toHaveBeenCalledWith({
      search: 'pizza',
      endpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=pizza',
    });
  });
});

describe('Testing App component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        meals: [{ idMeal: '1', strMeal: 'Meal 1' }, { idMeal: '2', strMeal: 'Meal 2' }],
      }),
    }));
    jest.spyOn(global, 'setTimeout').mockImplementation((fn) => fn());
  });

  afterEach(() => {
    global.fetch.mockRestore();
    global.setTimeout.mockRestore();
  });

  it('should render the SearchBar component', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const searchBar = screen.getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
  });

  it('should fetch and render search results when a search is performed', async () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const searchInput = screen.getByTestId(input);
    const searchButton = screen.getByTestId(button);

    fireEvent.change(searchInput, { target: { value: 'pizza' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const searchResults = screen.getByTestId('search-results');
      expect(searchResults).toBeInTheDocument();
      expect(searchResults.children.length).toBe(2);
    });
  });
});

test('Verifica tudo no searchBar', async () => {
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

  const img = screen.getByTestId('search-top-btn');
  userEvent.click(img);

  const inputs = screen.getByTestId(input);
  userEvent.type(inputs, 'abc');

  const first = screen.getByTestId('first-letter-search-radio');
  userEvent.click(first);

  const search = screen.getByTestId(button);
  userEvent.click(search);

  expect(global.alert).toHaveBeenCalledTimes(1);

  // Restaura a implementação original do alert após o teste
  alertMock.mockRestore();
});
