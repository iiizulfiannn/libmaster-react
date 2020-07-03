import { getAllAuthorsAction, pending, rejected, fulfilled } from '../actions/actionTypes'

const initialValue = {
    authors: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
}

const authors = (prevState = initialValue, action) => {
    switch (action.type) {
        case getAllAuthorsAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getAllAuthorsAction + rejected:
            return {
                ...prevState,
                isRejected: true,
                isLoading: false,
                authors: action.payload,
            }
        case getAllAuthorsAction + fulfilled:
            return {
                ...prevState,
                isFulfilled: true,
                isLoading: false,
                authors: action.payload.data.data,
            }
        default:
            return {
                ...prevState
            }
    }
}

export default authors