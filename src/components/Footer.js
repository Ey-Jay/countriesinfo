import React from 'react';

import '../App.css';

function Footer() {
  return (
    <footer className="footer">
      <p>
        data provided by{' '}
        <a
          href="https://github.com/trevorblades/countries"
          target="_blank"
          rel="noopener noreferrer"
        >
          Countries GraphQL API
        </a>{' '}
      </p>
    </footer>
  );
}

export default Footer;
