import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  test('pesquisar as bebidas quando o radio e selecionado', () => {
    render(<SearchBar />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'vodka' } });

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);

    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchButton);
  });

  test('dispara o alert quando não e a primeira letra do radio', () => {
    render(<SearchBar />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterRadio);

    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalledWith(
      'Your search must have only 1 (one) character',
    );
  });
});
