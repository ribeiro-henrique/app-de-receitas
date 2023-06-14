import clipboardCopy from 'clipboard-copy';
import PropTypes, { string } from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../images/shareIcon.svg';

function RecipeCardDoneWrapped(props) {
  // Extrai as propriedades do objeto props
  const { index, image, name, categoria, date, tags, type, id } = props;

  const [linkCopied, setLinkCopied] = useState('');

  // Função para lidar com o clique no botão de compartilhamento
  const handleClick = async () => {
    await clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setLinkCopied('Link copied!');
  };

  return (
    <div data-testid={ `${index}-recipe-card` }>
      {/* Link para a página da receita */}
      <Link to={ `/${type}s/${id}` }>
        <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
      </Link>

      <p data-testid={ `${index}-horizontal-top-text` }>{categoria}</p>

      {/* Link para a página da receita */}
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width="300px"
        />
      </Link>

      <p data-testid={ `${index}-horizontal-done-date` }>{date}</p>

      {/* Exibe a mensagem de link copiado */}
      <p data-testid="link-copied">{linkCopied}</p>

      {/* Botão de compartilhamento */}
      <button onClick={ () => handleClick() }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          alt="share button"
          src={ icon }
        />
      </button>

      {/* Renderiza as tags da receita */}
      {tags
        && tags.map((tag, i) => (
          <p
            key={ `${tag}-${i}` }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </p>
        ))}
    </div>
  );
}

RecipeCardDoneWrapped.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  categoria: PropTypes.string,
  date: PropTypes.string,
  tags: PropTypes.arrayOf(string),
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export const DoneCard = React.memo(RecipeCardDoneWrapped);
