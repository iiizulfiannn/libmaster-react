import { getAllStatusAction, pending, rejected, fulfilled } from '../actions/actionTypes'

const initialValue = {
    status: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
}

const status = (prevState = initialValue, action) => {
    switch (action.type) {
        case getAllStatusAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getAllStatusAction + rejected:
            return {
                ...prevState,
                isRejected: true,
                isLoading: false,
                status: action.payload,
            }
        case getAllStatusAction + fulfilled:
            return {
                ...prevState,
                isFulfilled: true,
                isLoading: false,
                status: action.payload.data.data,
            }
        default:
            return {
                ...prevState
            }
    }
}

export default status