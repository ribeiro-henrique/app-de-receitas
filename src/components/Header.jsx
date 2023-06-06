import React from 'react';
import { useHistory } from 'react-router-dom';
import { useHeader } from '../context/HeaderContext';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const { title, showSearchIcon, profileIcon,
    showSearchBar, setShowSearchBar } = useHeader();
  const history = useHistory();

  const handleShow = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

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
        <button
          onClick={ handleShow }
        >
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="search icon"
          />
        </button>
      </nav>
      <h1 data-testid="page-title">{title}</h1>
      {
        showSearchBar && (
          <div>
            <input
              data-testid="search-input"
            />
            <SearchBar />
          </div>
        )
      }

    </div>
  );
}

export default Header;
