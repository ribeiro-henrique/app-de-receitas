import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Recipes from '../pages/Recipes';

// usar o mock da pasta cypress, arquivo fetch

describe('Recipes', () => {
  beforeEach(() => {
    render(
      <Router>
        <Recipes />
      </Router>,
    );
  });

  test('renders category buttons', () => {
    const categoryButtons = screen.getAllByRole('button', { name: /category-filter/i });
    expect(categoryButtons.length).toBeGreaterThanOrEqual(1);
  });

  test('renders "All" button', () => {
    const allButton = screen.getByTestId('All-category-filter');
    expect(allButton).toBeInTheDocument();
  });

  test('renders recipe cards', () => {
    const recipeCards = screen.getAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBeGreaterThanOrEqual(1);
  });

  test('clicking a category button should fetch recipes from that category', async () => {
    const categoryButton = screen.getByTestId(/category-filter/i);
    fireEvent.click(categoryButton);

    // Wait for the recipes to be fetched and rendered
    await screen.findAllByTestId(/recipe-card/i);

    const recipeCards = screen.getAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBeGreaterThanOrEqual(1);
  });

  test('clicking the "All" button should fetch all recipes', async () => {
    const allButton = screen.getByTestId('All-category-filter');
    fireEvent.click(allButton);

    // Wait for the recipes to be fetched and rendered
    await screen.findAllByTestId(/recipe-card/i);

    const recipeCards = screen.getAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBeGreaterThanOrEqual(1);
  });

  test('renders multiple recipe cards when there are more than one food items', () => {
    const recipeImages = screen.getAllByAltText('Recipe');
    expect(recipeImages.length).toBeGreaterThanOrEqual(1);
  });
});
