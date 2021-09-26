import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {
  fetchSingleBookById,
  selectLoadingBooks,
  selectSingleBookById,
} from '../redux/features/books';

function BookPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loading = useSelector(selectLoadingBooks);
  const book = useSelector(selectSingleBookById(id));

  React.useEffect(() => {
    dispatch(fetchSingleBookById(id));
  }, [dispatch, id]);

  return (
    <div className="container">
      {!loading ? (
        <div className="book-page">
          <Helmet>
            <title>{book.volumeInfo.title}</title>
          </Helmet>
          <div className="book-image">
            <img
              src={
                book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Mz3sqDvFMNTgft394pfjhZlsx7OWD47o3A&usqp=CAU'
              }
              alt=""
            />
          </div>
          <div className="book-info">
            <h2 className="book-info__title">{book.volumeInfo.title}</h2>

            <ul className="book-info__categories">
              <li className="li-title">Categories: </li>
              {book.volumeInfo.categories
                ? book.volumeInfo.categories.map((category) => (
                    <li key={category}>{category}</li>
                  ))
                : '-----'}
            </ul>
            <p className="book-info__description">
              {book.volumeInfo.description}
            </p>
            <ul className="book-info__authors">
              <li className="li-title">Authors: </li>
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.map((author, i) => (
                    <li key={i}>{author}</li>
                  ))
                : 'Unknow'}
            </ul>
            <div className="book-info__original-link">
              <span>Original links: </span>
              <a href={book.volumeInfo.previewLink}>Preview link</a>
              <a href={book.volumeInfo.infoLink}>Info link</a>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader" style={{ paddingTop: '40vh' }}>
          <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
        </div>
      )}
    </div>
  );
}

export default BookPage;
