import React, { useState } from 'react';
import Header from '../components/Header';
import { DoneCard } from '../components/RecipeCardDone';
import { useLocalStorage } from '../services/useLocalStorage';

function DoneRecipes() {
  // Utiliza o hook useLocalStorage para obter as receitas concluídas
  const [allDone] = useLocalStorage('doneRecipes', []);
  const [filtered, setFiltered] = useState(allDone);

  // Função para filtrar as receitas com base no tipo (meal ou drink)
  const handleFilter = (type) => {
    const filtradas = allDone.filter((r) => r.type?.startsWith(type));
    setFiltered(filtradas);
  };

  return (
    <>
      {/* Renderiza o cabeçalho */}
      <Header title="Done Recipes" iconeProfile />

      {/* Botões para filtrar por tipo (All, Meals, Drinks) */}
      <button
        onClick={ () => handleFilter('') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      <button
        onClick={ () => handleFilter('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>

      <button
        onClick={ () => handleFilter('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      {/* Renderiza as receitas concluídas filtradas */}
      {filtered?.map((element, i) => (
        <DoneCard
          key={ i }
          recipe={ element }
          index={ i }
          image={ element.image }
          name={ element.name }
          date={ element.doneDate }
          tags={ element.tags }
          type={ element.type }
          id={ element.id }
          categoria={ `${element.nationality}
          - ${element.category} - ${element.alcoholicOrNot}` }
        />
      ))}
    </>
  );
}

export default React.memo(DoneRecipes);
