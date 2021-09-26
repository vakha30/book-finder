import axios from 'axios';

const initialState = {
  items: [],
  totalItems: 0,
  loading: true,
  isLoadedMore: false,
  startLoading: false,
  error: null,
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case 'books/fetch/pending':
      return {
        ...state,
        loading: true,
      };
    case 'books/fetch/fulfilled':
      const newItems = state.items
        ? [...state.items, ...action.payload.items]
        : action.payload.items;
      return {
        ...state,
        items: newItems,
        totalItems: action.payload.totalItems,
        loading: false,
      };
    case 'books/fetch/reject':
      return {
        ...state,
        error: action.error,
      };
    case 'books/fetch-single/pending':
      return {
        ...state,
        loading: true,
      };
    case 'books/fetch-single/fulfilled':
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case 'books/fetch-single/rejected':
      return {
        ...state,
        error: action.error,
      };
    case 'books/set-load-more':
      return {
        ...state,
        isLoadedMore: action.payload,
      };
    case 'books/start-loading':
      return {
        ...state,
        startLoading: action.payload,
      };
    default:
      return state;
  }
};

export default books;

const setLoading = (value) => ({
  type: 'books/fetch/pending',
});
const setBooks = (data) => ({
  type: 'books/fetch/fulfilled',
  payload: data,
});

export const setLoadedMore = (value) => ({
  type: 'books/set-load-more',
  payload: value,
});

export const setStartLoading = (value) => ({
  type: 'books/start-loading',
  payload: value,
});

export const fetchBooks = (queryParams, offset) => async (dispatch) => {
  const { inputText, category, sortBy } = queryParams;
  dispatch(setLoading());

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${inputText}+subject:${
        category !== 'all' ? category : ''
      }&orderBy=${sortBy}&maxResults=30&startIndex=${offset}`
    );
    dispatch(setBooks(response.data));
  } catch (e) {
    dispatch({ type: 'books/fetch/reject', error: e.toString() });
  }
};

export const fetchSingleBookById = (id) => {
  // второй параметр getState позволяет забрать текущее значение
  // всего глобального стейта
  return async (dispatch, getState) => {
    // Если этот продукт уже есть в списке, то не будем делать запрос в лишний раз.

    // Чтобы узнать есть ли продукт сначала извлекаем весь список продуктов
    const { books } = getState();

    // и проверяем есть ли в этом массиве продукт с указанным id
    if (books.items.find((book) => book.id === id)) {
      // если продукт найден, то прекращаем действие функции с помощью return
      return;
    }

    // иначе получаем с сервера нужный продукт
    dispatch({ type: 'books/fetch-single/pending' });

    try {
      const response = await axios(
        `https://www.googleapis.com/books/v1/volumes?q="${id}"`
      );
      const book = await response.data;

      dispatch({ type: 'books/fetch-single/fulfilled', payload: book.items });
    } catch (e) {
      dispatch({ type: 'books/fetch-single/rejected', error: e.toString() });
    }
  };
};

export const fetchMoreBooks = (queryParams, offset) => async (dispatch) => {
  const { inputText, category, sortBy } = queryParams;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${inputText}+subject:${
        category !== 'all' ? category : ''
      }&orderBy=${sortBy}&maxResults=30&startIndex=${offset}`
    );

    dispatch(setBooks(response.data));
    dispatch(setLoadedMore(false));
  } catch (e) {
    dispatch({ type: 'books/fetch-single/rejected', error: e.toString() });
  }
};

export const selectAllBooks = (state) => state.books.items;
export const selectLoadingBooks = (state) => state.books.loading;
export const selectLoadedMore = (state) => state.books.isLoadedMore;
export const selectStartLoading = (state) => state.books.startLoading;
export const selectTotalItems = (state) => state.books.totalItems;

export const selectSingleBookById = (bookId) => (state) => {
  return state.books.items.find((book) => book.id === bookId);
};
