const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export async function drinkIngre(ingredient) {
  try {
    const response = await fetch(`${API_URL}/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error('Error ao buscar igrediente:', error);
    throw error;
  }
}

export async function drinkName(name) {
  try {
    const response = await fetch(`${API_URL}/search.php?s=${name}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error('Error ao buscar name:', error);
    throw error;
  }
}

export async function drinkFirts(letter) {
  try {
    const response = await fetch(`${API_URL}/search.php?f=${letter}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error('Error ao buscar primeira letra:', error);
    throw error;
  }
}
