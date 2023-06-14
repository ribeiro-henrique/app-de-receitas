import React, { useMemo } from 'react';
import { useLocalStorage } from '../services/useLocalStorage';
import Context from './MyContext';

export const CHAVE_FAVORITOS = 'favoriteRecipes';

function ProvedorContexto({ children }) {
  // Obtém as receitas favoritas do local storage usando o hook useLocalStorage
  const [receitasFavoritas, setReceitasFavoritas] = useLocalStorage(CHAVE_FAVORITOS, []);

  // Cria um objeto contendo as funções de adicionar e remover favoritos, e a lista de favoritos
  const objeto = useMemo(() => {
    // Função para adicionar uma nova receita aos favoritos
    const addFavorite = (receita) => {
      // Verifica se a receita já está nos favoritos
      const isFavorite = receitasFavoritas.some((fav) => fav.id === receita.id);
      if (!isFavorite) {
        // Se não estiver nos favoritos, adiciona a nova receita à lista
        setReceitasFavoritas((prevState) => [...prevState, receita]);
      }
    };

    // Função para remover uma receita dos favoritos com base no ID
    const removeFavoriteById = (id) => {
      // Filtra a lista de favoritos, removendo a receita com o ID correspondente
      const novoArray = receitasFavoritas.filter((fav) => fav.id !== id);
      if (novoArray.length !== receitasFavoritas.length) {
        // Se o tamanho do novo array for diferente do tamanho anterior, atualiza a lista de favoritos
        setReceitasFavoritas(novoArray);
      }
    };

    // Retorna um objeto contendo a lista de favoritos, e as funções de adicionar e remover favoritos
    return {
      favorites: receitasFavoritas,
      addFavorite,
      removeFavoriteById,
    };
  }, [receitasFavoritas, setReceitasFavoritas]);

  // Renderiza o provedor de contexto, passando o objeto como valor e renderizando os componentes filhos
  return (
    <Context.Provider value={ objeto }>
      {children}
    </Context .Provider>
  );
}

ProvedorContexto.propTypes = {}.isRequired;

export default React.memo(ProvedorContexto);
