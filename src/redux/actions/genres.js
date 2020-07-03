import { getAllGenresAction } from './actionTypes'
import { getAllGenres } from '../../utils/http'

export const getAllGenresActionAdmin = () => {
    return {
        type: getAllGenresAction,
        payload: getAllGenres(),
    }
}