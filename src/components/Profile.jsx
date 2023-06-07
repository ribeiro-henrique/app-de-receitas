import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHeader } from '../context/HeaderContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Footer from './Footer';

function Profile() {
  const [validateEmail, setValidateEmail] = useState('');
  const { title, setTitle, setShowSearchIcon, profileIcon } = useHeader();
  const history = useHistory();
  useEffect(() => {
    setTitle('Profile');
    setShowSearchIcon(true);
    const storedUserEmail = localStorage.getItem('user');
    if (storedUserEmail) {
      const { email } = JSON.parse(storedUserEmail);
      setValidateEmail(email);
    }
    return () => {
      setTitle('');
      setShowSearchIcon(false);
    };
  }, [setTitle, setShowSearchIcon]);
  const handleClick = (action) => {
    if (action === 'doneRecipes') {
      history.push('/done-recipes');
    } if (action === 'favoriteRecipes') {
      history.push('/favorite-recipes');
    } if (action === 'logout') {
      localStorage.clear();
      history.push('/');
    }
  };
  return (
    <main>
      <div>
        <button>
          <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
        </button>
        <h1 data-testid="page-title">{title}</h1>
        <h2 data-testid="profile-email">{ validateEmail }</h2>
      </div>
      <div>
        <button
          data-testid="profile-done-btn"
          onClick={ () => handleClick('doneRecipes') }
        >
          <img
            alt=""
            src={ blackHeartIcon }
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Done Recipes
        </button>
        <br />
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => handleClick('favoriteRecipes') }
        >
          <img
            alt=""
            src={ blackHeartIcon }
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Favorite Recipes
        </button>
        <br />
        <button
          data-testid="profile-logout-btn"
          onClick={ () => handleClick('logout') }
        >
          <img
            alt=""
            src={ blackHeartIcon }
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Logout
        </button>
      </div>
      <Footer />
    </main>
  );
}
export default Profile;
