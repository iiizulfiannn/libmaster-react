import { getAllUsersAction } from './actionTypes'
import { getAllUsers } from '../../utils/http'

export const getAllUsersActionCreator = () => {
    return {
        type: getAllUsersAction,
        payload: getAllUsers(),
    }
}