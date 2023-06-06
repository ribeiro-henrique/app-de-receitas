import PropTypes from 'prop-types';
import React, { createContext, useContext, useMemo, useState } from 'react';
import profileIcon from '../images/profileIcon.svg';

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [title, setTitle] = useState('');
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const headerValue = useMemo(() => ({
    title,
    setTitle,
    showSearchIcon,
    setShowSearchIcon,
    showSearchBar,
    setShowSearchBar,
    profileIcon }), [title, showSearchIcon, showSearchBar]);

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
