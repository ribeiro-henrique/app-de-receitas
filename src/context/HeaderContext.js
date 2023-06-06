import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [title, setTitle] = useState('');
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const profileIcon = 'src/images/profileIcon.svg';

  const headerValue = useMemo(() => ({
    title,
    setTitle,
    showSearchIcon,
    setShowSearchIcon,
    profileIcon }), [title, showSearchIcon]);

  return (
    <HeaderContext.Provider value={ headerValue }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useHeader() {
  return useContext(HeaderContext);
}
