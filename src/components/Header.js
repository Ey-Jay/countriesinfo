import React from 'react';

function Header() {
  return (
    <header>
      <h1 style={{ textTransform: 'uppercase' }}>
        {' '}
        <span role="img" aria-label="emoji">
          🌍
        </span>{' '}
        information{' '}
      </h1>
    </header>
  );
}

export default Header;
