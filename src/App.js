import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Header, BookCard, BookPage } from "./components";
import {
  fetchBooks,
  setStartLoading,
  fetchMoreBooks,
  setLoadedMore,
} from "./redux/action/books";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const { items, totalItems, isLoaded, isLoadedMore, startLoading } =
    useSelector(({ books }) => books);

  const [inputParams, setInputParams] = React.useState("");
  const [pageNum, setPageNum] = React.useState(1);

  const searchBooks = (data, offset = 0) => {
    setInputParams(data);
    dispatch(setStartLoading(true));
    dispatch(fetchBooks(data, offset));
  };

  const loadMore = () => {
    dispatch(setLoadedMore(true));
    dispatch(fetchMoreBooks(inputParams, pageNum * 30));
    setPageNum(pageNum + 1);
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/book-finder">
          <Header searchBooks={searchBooks} />
          {startLoading ? (
            isLoaded ? (
              <div className="container">
                <h3 className="found-books">Found {totalItems} books</h3>
                <div className="books">
                  {items &&
                    items.map((item, index) => (
                      <Link
                        className="book-card"
                        to={`books/${item.id}`}
                        key={item.id + index}
                      >
                        <BookCard
                          title={item.volumeInfo.title}
                          category={item.volumeInfo.categories}
                          authors={item.volumeInfo.authors}
                          imageUrl={
                            item.volumeInfo.imageLinks &&
                            item.volumeInfo.imageLinks.smallThumbnail
                          }
                        />
                      </Link>
                    ))}
                </div>
                <div className="load-more">
                  {!isLoadedMore ? (
                    <button onClick={loadMore}>Load more</button>
                  ) : (
                    <Loader
                      type="ThreeDots"
                      color="#00BFFF"
                      height={80}
                      width={80}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="loader">
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={80}
                  width={80}
                />
              </div>
            )
          ) : (
            <div className="empthy">
              <h2>empthy</h2>
            </div>
          )}
        </Route>
        <Route path="/book-finder/books/:id">
          <BookPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
