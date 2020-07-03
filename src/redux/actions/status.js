import { getAllStatusAction } from './actionTypes'
import { getAllStatus } from '../../utils/http'

export const getAllStatusActionAdmin = () => {
    return {
        type: getAllStatusAction,
        payload: getAllStatus(),
    }
}