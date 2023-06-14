import * as Toggle from '@radix-ui/react-toggle';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import { fetchCategories } from '../services/fetchCategories';

function CategoriesWrapped({ filters, setFilters }) {
  const history = useHistory();
  const { pathname } = history.location;
  const isMeal = pathname.includes('/meals');

  const trem = isMeal ? 'meals' : 'drinks';

  // Utiliza o hook useSWR para buscar as categorias
  const { data, error, isLoading } = useSWR(
    `categories/${trem}`,
    () => fetchCategories(isMeal),
  );

  const categories = filters ? filters.categories : [];

  return (
    <div className="flex gap-[5px]">
      {isLoading && (<div>Carregando categorias...</div>)}
      {!isLoading && error && (
        <div>
          Não foi possível carregar categorias:
          {error.message}
        </div>)}
      {!isLoading && (
        <Toggle.Root
          className="Toggle"
          data-testid="All-category-filter"
          pressed={ categories.length === 0 }
          onPressedChange={ () => {
            setFilters({ ...filters, categories: [] });
          } }
        >
          All
        </Toggle.Root>
      )}
      {!isLoading && data && data.map((category) => {
        const categoria = category.strCategory;
        return (
          <Toggle.Root
            className="Toggle"
            key={ categoria }
            data-testid={ `${categoria}-category-filter` }
            pressed={ categories.includes(categoria) }
            onPressedChange={ (pressed) => {
              if (pressed) {
                setFilters({ ...filters, categories: [categoria] });
              } else {
                setFilters({ ...filters, categories: [] });
              }
            } }
          >
            {categoria}
          </Toggle.Root>
        );
      })}
    </div>
  );
}

CategoriesWrapped.propTypes = {}.isRequired;

export const Categories = React.memo(CategoriesWrapped);
