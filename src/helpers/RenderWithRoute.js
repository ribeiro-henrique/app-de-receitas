import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  function Wrapper() {
    return <Router history={ history }>{component}</Router>;
  }

  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  };
}

export default renderWithRouter;
