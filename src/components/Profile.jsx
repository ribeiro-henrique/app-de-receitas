import React, { useEffect } from 'react';
import { useHeader } from '../context/HeaderContext';

function Profile() {
  const { title, setTitle, setShowSearchIcon, profileIcon } = useHeader();

  useEffect(() => {
    setTitle('Profile');
    setShowSearchIcon(true);

    return () => {
      setTitle('');
      setShowSearchIcon(false);
    };
  }, [setTitle, setShowSearchIcon]);

  return (
    <div>
      <button>
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

export default Profile;
