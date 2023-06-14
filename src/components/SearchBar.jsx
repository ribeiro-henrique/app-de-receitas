import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Função para obter o endpoint com base na opção de busca selecionada
export function getEndpoint(comidas, option, parametro) {
  let endpoint = '';
  if (option === 'ingredient') {
    endpoint = comidas
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${parametro}`
      : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${parametro}`;
  } else if (option === 'name') {
    endpoint = comidas
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${parametro}`
      : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${parametro}`;
  } else if (option === 'first-letter') {
    if (parametro.length > 1) {
      // Exibe um alerta caso a busca por primeira letra tenha mais de um caractere
      global.alert('Your search must have only 1 (one) character');
    } else {
      endpoint = comidas
        ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${parametro}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${parametro}`;
    }
  } else {
    throw new Error('No search option selected');
  }
  return endpoint;
}
export default function SearchBar({ setPesquisa }) {
  const [parametro, setparametro] = useState('');
  const [searchOption, setSearchOption] = useState('ingredient');
  const history = useHistory();
  const { pathname } = history.location;
  const comidas = pathname.includes('/meals');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Ao enviar o formulário, obtém o endpoint com base nas opções selecionadas
    const endpoint = getEndpoint(comidas, searchOption, parametro);
    // Chama a função setPesquisa passando o termo de busca e o endpoint
    setPesquisa({ search: parametro, endpoint });
  };
  const handleChange = (event) => {
    // Atualiza o estado do termo de busca ao digitar no campo de input
    setparametro(event.target.value);
  };
  const handleOptionChange = (event) => {
    // Atualiza o estado da opção de busca ao selecionar uma opção de rádio
    setSearchOption(event.target.value);
  };
  return (
    <div>
      <form className="search-bar" onSubmit={ handleSubmit }>
        <input
          type="search"
          data-testid="search-input"
          placeholder="Search Recipes"
          value={ parametro }
          onChange={ handleChange }
        />
        <div className="search-options">
          <label htmlFor="ingredient-search-radio">
            <input
              type="radio"
              name="search-option"
              id="ingredient-search-radio"
              value="ingredient"
              checked={ searchOption === 'ingredient' }
              onChange={ handleOptionChange }
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>
          <label htmlFor="name-search-radio">
            <input
              type="radio"
              name="search-option"
              id="name-search-radio"
              value="name"
              checked={ searchOption === 'name' }
              onChange={ handleOptionChange }
              data-testid="name-search-radio"
            />
            Name
          </label>
          <label htmlFor="first-letter-search-radio">
            <input
              type="radio"
              name="search-option"
              id="first-letter-search-radio"
              value="first-letter"
              checked={ searchOption === 'first-letter' }
              onChange={ handleOptionChange }
              data-testid="first-letter-search-radio"
            />
            First Letter
          </label>
        </div>
        <button type="submit" data-testid="exec-search-btn">Search</button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  setPesquisa: PropTypes.func.isRequired,
};
