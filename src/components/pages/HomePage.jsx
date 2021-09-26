import React from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchBooks,
  setStartLoading,
  fetchMoreBooks,
  setLoadedMore,
  selectAllBooks,
  selectLoadingBooks,
  selectLoadedMore,
  selectStartLoading,
  selectTotalItems,
} from '../../redux/features/books';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { BookCard } from '../';

function HomePage() {
  const dispatch = useDispatch();

  const items = useSelector(selectAllBooks);
  const loading = useSelector(selectLoadingBooks);
  const isLoadedMore = useSelector(selectLoadedMore);
  const startLoading = useSelector(selectStartLoading);
  const totalItems = useSelector(selectTotalItems);

  const [inputParams, setInputParams] = React.useState('');
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

  if (!startLoading) {
    return (
      <>
        <Header searchBooks={searchBooks} />
        <div className="empthy">
          <h2>empthy</h2>
        </div>
      </>
    );
  }

  if (startLoading && loading) {
    return (
      <>
        <Header searchBooks={searchBooks} />
        <div className="loader">
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
      </>
    );
  }

  return (
    <div>
      <Header searchBooks={searchBooks} />

      <div className="container">
        <h3 className="found-books">
          Found
          {totalItems}
          books
        </h3>
        <div className="books">
          {items &&
            items.map((item, index) => (
              <Link
                className="book-card"
                to={`book-finder/books/${item.id}`}
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
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
