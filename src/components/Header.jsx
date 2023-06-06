import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useHeader } from '../context/HeaderContext';

function Header() {
  const { pathname } = useLocation();
  const { title, showSearchIcon, profileIcon } = useHeader();
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/profile');
  };

  if (pathname === '/') {
    return null;
  }
  return (
    <div>
      <nav>
        {showSearchIcon && (
          <button onClick={ handleProfileClick }>
            <img
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="profile icon"
            />
          </button>
        )}
        <button>
          <img
            src="src/image/searchIcon.svg"
            data-testid="search-top-btn"
            alt="search icon"
          />
        </button>
      </nav>
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

export default Header;
