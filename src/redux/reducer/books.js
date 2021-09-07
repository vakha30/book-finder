const initialState = {
    items: [],
    totalItems: 0,
    isLoaded: false,
    isLoadedMore: false,
    startLoading: false
}

const books = (state = initialState, action) => {
    switch (action.type) {
        case "SET_BOOKS":
            const newItems = state.items ? [...state.items, ...action.payload.items] : action.payload.items
            return {
                ...state,
                items: newItems,
                totalItems: action.payload.totalItems
            }
        case "SET_LOADED":
            return {
                ...state,
                isLoaded: action.payload
            }
        case "SET_LOADED_MORE":
            return {
                ...state,
                isLoadedMore: action.payload
            }
        case "START_LOADING":
            return {
                ...state,
                startLoading: action.payload
            }
        default:
            return state
    }
}

export default books