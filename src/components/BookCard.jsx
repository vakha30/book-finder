import React from 'react';
import PropTypes from 'proptypes';

function BookCard({ title, imageUrl, category, authors }) {
  return (
    <>
      <div className="book-card__img">
        <img src={imageUrl} alt="" />
      </div>
      <h2 className="book-card__title">{title}</h2>
      <p className="book-card__category">{category[0]}</p>
      {authors.map((author, index) => (
        <span key={index} className="book-card__authors">
          {`${author}, `}
        </span>
      ))}
    </>
  );
}

BookCard.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  category: PropTypes.arrayOf(PropTypes.string),
  authors: PropTypes.arrayOf(PropTypes.string),
};

BookCard.defaultProps = {
  title: '-------',
  imageUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Mz3sqDvFMNTgft394pfjhZlsx7OWD47o3A&usqp=CAU',
  category: ['----'],
  authors: ['Unknow'],
};

export default BookCard;
