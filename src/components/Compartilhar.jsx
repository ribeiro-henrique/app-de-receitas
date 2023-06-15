import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function Compartilhar({ pathname }) {
  const tempoMsgDeCopiado = 3500;
  const [linkCopiado, setLinkCopiado] = useState(false);

  const copy = async (text) => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(text);
    }
  };

  // const getRecipeDetailsLink = () => {
  //   const parts = pathname.split('/');
  //   parts.pop(); // Remove o último elemento ("/in-progress")
  //   return parts.join('/');
  // };

  const handleCopyClick = async () => {
    const text = `http://localhost:3000${pathname}`;
    await copy(text);

    setLinkCopiado(true);

    setTimeout(() => {
      setLinkCopiado(false);
    }, tempoMsgDeCopiado);
  };

  return (
    <button
      data-testid="share-btn"
      className="icone-link"
      onClick={ handleCopyClick }
    >
      <img src={ shareIcon } alt="share" />
      {linkCopiado && <span>Link copied!</span>}
    </button>
  );
}

Compartilhar.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default React.memo(Compartilhar);
