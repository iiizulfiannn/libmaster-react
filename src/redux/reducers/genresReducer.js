import { getAllGenresAction, pending, rejected, fulfilled } from '../actions/actionTypes'

const initialValue = {
    genres: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
}

const genres = (prevState = initialValue, action) => {
    switch (action.type) {
        case getAllGenresAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getAllGenresAction + rejected:
            return {
                ...prevState,
                isRejected: true,
                isLoading: false,
                genres: action.payload,
            }
        case getAllGenresAction + fulfilled:
            return {
                ...prevState,
                isFulfilled: true,
                isLoading: false,
                genres: action.payload.data.data,
            }
        default:
            return {
                ...prevState
            }
    }
}

export default genres