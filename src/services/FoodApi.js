const URL_ALL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchByI(ingredient) {
  try {
    const response = await fetch(`${URL_ALL}/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error('Error ao pesquisar ingrediente:', error);
    throw error;
  }
}

export async function searchByN(name) {
  try {
    const response = await fetch(`${URL_ALL}/search.php?s=${name}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error('Error ao pesquisar receitas:', error);
    throw error;
  }
}

export async function searchByL(letter) {
  try {
    const response = await fetch(`${URL_ALL}/search.php?f=${letter}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error('Error ao pesquisar receita pela primeira letra:', error);
    throw error;
  }
}
