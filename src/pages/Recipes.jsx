import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Categories } from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SearchResult } from '../components/SearchResult';

// Função assíncrona que retorna a lista de produtos (receitas) com base no endpoint e no tipo de refeição
export const getRecipes = async (endpoint, isMeal) => {
  if (!endpoint) return [];
  const response = await fetch(endpoint);
  const json = await response.json();
  if (isMeal) return json.meals || [];
  return json.drinks || [];
};

// Função assíncrona que puxa os produtos (receitas) com base no endpoint de pesquisa e atualiza o estado com os resultados filtrados
const categories = async (
  searchPoint,
  results,
  maxLength,
  history,
) => {
  const { pathname } = history.location;
  const isMeal = pathname.includes('meals');

  if (searchPoint.length === 0) {
    // Se não foi feita nenhuma pesquisa, puxar os 12 primeiros produtos
    const endpoint = isMeal
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const productsList = await getRecipes(endpoint, isMeal);
    results(productsList.slice(0, maxLength));
    return;
  }

  // Se foi feita uma pesquisa, puxar os 12 primeiros produtos
  const productsList = await getRecipes(searchPoint, isMeal);
  if (productsList.length === 0) {
    // Se nenhum produto foi encontrado, exibir uma mensagem de erro
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    return;
  }
  if (isMeal && productsList.length === 1) {
    // Se apenas um produto de refeição foi encontrado, redirecionar para a página do produto
    history.push({
      pathname: `/meals/${productsList[0].idMeal}`,
      state: 'meal',
    });
    return;
  }
  if (!isMeal && productsList.length === 1) {
    // Se apenas um produto de bebida foi encontrado, redirecionar para a página do produto
    history.push({
      pathname: `/drinks/${productsList[0].idDrink}`,
      state: 'drink',
    });
    return;
  }
  results(productsList.slice(0, maxLength));
};

function Recipes() {
  const [filters, setFilters] = useState({ categories: [] });
  const [pesquisa, setPesquisa] = useState({
    search: '',
    endpoint: '',
  });
  const [filteredSearchResult, results] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;

  const isMeal = pathname.includes('meals');
  const titulo = isMeal ? 'Meals' : 'Drinks';
  const maxLength = 12;

  useEffect(() => {
    const func = async () => {
      if (filters.categories.length === 0) {
        // Se nenhuma categoria foi selecionada, puxar produtos com base na pesquisa
        await categories(
          pesquisa.endpoint,
          results,
          maxLength,
          history,
        );
      } else {
        // Se uma categoria foi selecionada, puxar produtos com base na categoria
        const endpoint = isMeal
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filters.categories[0]}`
          : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.categories[0]}`;
        const productsList = await getRecipes(endpoint, isMeal);
        results(productsList.slice(0, maxLength));
      }
    };
    func().then();
  }, [filters.categories, pesquisa.endpoint, isMeal, history]);

  return (
    <>
      <div>
        {/* Cabeçalho com título, ícone de perfil, ícone de pesquisa e função de pesquisa */}
        <Header
          title={ titulo }
          iconeProfile
          iconeSearch
          setPesquisa={ setPesquisa }
        />
      </div>
      {/* Componente de categorias para filtrar as receitas */}
      <Categories filters={ filters } setFilters={ setFilters } />
      {/* Componente que exibe os resultados da pesquisa */}
      <SearchResult recipes={ filteredSearchResult } />
      {/* Rodapé */}
      <Footer />
    </>
  );
}

export default React.memo(Recipes);
