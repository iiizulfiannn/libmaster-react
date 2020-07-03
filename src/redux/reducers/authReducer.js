import {
    registerUserAction,
    loginUserAction,
    pending,
    rejected,
    fulfilled,
    resetStateAction,
    currentUserAction
} from '../actions/actionTypes'

const initialValue = {
    currentUser: {},
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    isInvalid: false,
    message: ''
}

const auth = (prevState = initialValue, action) => {
    switch (action.type) {
        case registerUserAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case registerUserAction + rejected:
            return {
                ...prevState,
                isRejected: true,
                isLoading: false,
                message: 'Failed Register',
            }
        case registerUserAction + fulfilled:
            return {
                ...prevState,
                isFulfilled: true,
                isLoading: false,
                message: 'Register Success',
            }

        case loginUserAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case loginUserAction + rejected:
            return {
                ...prevState,
                isRejected: true,
                isLoading: false,
                message: 'Failed Login',
            }
        case loginUserAction + fulfilled:
            const status = action.payload.status

            if (status === 204) {
                return {
                    ...prevState,
                    isFulfilled: false,
                    isLoading: false,
                    isInvalid: true,
                }
            }

            let user
            if (status === 200) {
                user = action.payload.data.data
                localStorage.setItem('user', JSON.stringify(user))
            }
            return {
                ...prevState,
                isFulfilled: true,
                isLoading: false,
                message: `Welcome, ${user.fullname}`,
            }

        case currentUserAction:
            const currentUser = JSON.parse(localStorage.getItem('user'))

            return {
                ...prevState,
                currentUser
            }

        case resetStateAction:
            return {
                ...prevState,
                isFulfilled: false,
                isInvalid: false,
                isLoading: false,
                isRejected: false,
            }

        default:
            return {
                ...prevState
            }
    }
}

export default auth