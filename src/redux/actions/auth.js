import { registerUserAction, loginUserAction, currentUserAction, resetStateAction } from './actionTypes'
import { register, login } from '../../utils/http'

export const registerUserActionCreator = (data) => {
    return {
        type: registerUserAction,
        payload: register(data)
    }
}

export const loginUserActionCreator = (data) => {
    return {
        type: loginUserAction,
        payload: login(data)
    }
}

export const currentUserActionCreator = () => {
    return {
        type: currentUserAction,
    }
}

export const resetStateActionCreator = () => {
    return {
        type: resetStateAction,
    }
}
