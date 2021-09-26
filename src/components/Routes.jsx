import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { BookPage } from './';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/book-finder">
          <HomePage />
        </Route>
        <Route path="/book-finder/books/:id">
          <BookPage />
        </Route>
        <Redirect to="/book-finder" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
