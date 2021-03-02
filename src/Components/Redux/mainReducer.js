const IS_LOADING = 'TOGGLE_IS_LOADING'
const SET_ERROR = 'SET_ERROR'

const initialState = {
    isLoading: false,
    error: null
}

export const mainReducer = (state = initialState, action)  => {
    switch (action.type) {
        case IS_LOADING: {
            return {...state, isLoading: action.isLoading}
        }
        case SET_ERROR: {
            return {...state, error: action.error}
        }
        default: {
            return state
        }
    }
}

export const toggleIsLoading = (isLoading) => ({type: IS_LOADING, isLoading})
export const setError = (error) => ({type: SET_ERROR, error})