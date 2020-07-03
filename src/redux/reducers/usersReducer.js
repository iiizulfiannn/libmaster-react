import { getAllUsersAction, pending, rejected, fulfilled } from '../actions/actionTypes'

const initialValue = {
    users: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
}

const users = (prevState = initialValue, action) => {
    switch (action.type) {
        case getAllUsersAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getAllUsersAction + rejected:
            return {
                ...prevState,
                isRejected: true,
                isLoading: false,
                users: action.payload,
            }
        case getAllUsersAction + fulfilled:
            return {
                ...prevState,
                isFulfilled: true,
                isLoading: false,
                users: action.payload.data.data,
            }
        default:
            return {
                ...prevState
            }
    }
}

export default users