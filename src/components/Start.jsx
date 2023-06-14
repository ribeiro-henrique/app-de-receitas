import PropTypes from 'prop-types';
import React from 'react';
import { useLocalStorage } from '../services/useLocalStorage';

function Start({ id, type, history }) {
  const [inProgressRecipes, setInProgressRecipes] = useLocalStorage(
    'inProgressRecipes',
    { meals: {}, drinks: {} },
  );

  const inProgress = id in inProgressRecipes[type];

  const handleStartClick = () => {
    const newProgressRecipes = {
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [id]: [],
      },
    };

    setInProgressRecipes(newProgressRecipes);
    history.push(`/${type}/${id}/in-progress`);
  };

  return (
    <div>
      <button
        style={ {
          position: 'fixed',
          bottom: '0px',
        } }
        className="start-button"
        data-testid="start-recipe-btn"
        onClick={ handleStartClick }
      >
        {inProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}

Start.propTypes = {
  type: PropTypes.oneOf(['meal', 'drink']).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default React.memo(Start);
