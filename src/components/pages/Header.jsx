import React from 'react';
import { Helmet } from 'react-helmet';

import SearchBlock from '../SearchBlock';

function Header({ searchBooks }) {
  return (
    <div className="header">
      <Helmet>
        <title>Все книги</title>
      </Helmet>
      <div className="header__inner">
        <h1 className="header__title">Book finder</h1>
        <SearchBlock searchBooks={searchBooks} />
      </div>
    </div>
  );
}

export default Header;
