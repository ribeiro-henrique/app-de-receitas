import PropTypes from 'prop-types';
import React from 'react';
import { useLocalStorage } from '../services/useLocalStorage';
import Footer from './Footer';
import Header from './Header';

function Profile({ history }) {
  // Utiliza o hook useLocalStorage para obter o estado do usuário
  const [user] = useLocalStorage('user');

  return (
    <>
      <div>
        {/* Renderiza o cabeçalho */}
        <Header title="Profile" iconeProfile search={ false } />

        {/* Renderiza o email do usuário */}
        <h1 data-testid="profile-email">
          {user && user.email}
        </h1>

        {/* Botão para navegar para a página de receitas concluídas */}
        <button
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        {/* Botão para navegar para a página de receitas favoritas */}
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        {/* Botão para realizar o logout */}
        <button
          data-testid="profile-logout-btn"
          onClick={ () => {
            // Limpa os dados do localStorage
            localStorage.clear();
            // Navega para a página inicial
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
      {/* Renderiza o rodapé */}
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default React.memo(Profile);
