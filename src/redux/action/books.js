import axios from 'axios'

export const fetchBooks = (queryParams, offset) => (dispatch) => {
    const { inputText, category, sortBy } = queryParams;
    dispatch(setLoaded(false))
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${inputText}+subject:${category !== 'all'  ? category : ''}&orderBy=${sortBy}&maxResults=30&startIndex=${offset}`)
        .then(({ data }) => {
            dispatch(setBooks(data))
            dispatch(setLoaded(true))
        })
        .catch(e => console.log(e))
}

export const fetchMoreBooks = (queryParams, offset) => (dispatch) => {
    const { inputText, category, sortBy } = queryParams;
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${inputText}+subject:${category !== 'all'  ? category : ''}&orderBy=${sortBy}&maxResults=30&startIndex=${offset}`)
        .then(({ data }) => {
            dispatch(setBooks(data))
            dispatch(setLoadedMore(false))
        })
        .catch(e => console.log(e))
}

const setBooks = (data) => {
    return {
        type: "SET_BOOKS",
        payload: data
    }
}

const setLoaded = (value) => {
    return {
        type: "SET_LOADED",
        payload: value
    }
}

export const setLoadedMore = (value) => {
    return {
        type: "SET_LOADED_MORE",
        payload: value
    }
}

export const setStartLoading = (value) => {
    return {
        type: "START_LOADING",
        payload: value
    }
}