import { getAllAuthorsAction } from './actionTypes'
import { getAllAuthors } from '../../utils/http'

export const getAllAuthorsActionAdmin = () => {
    return {
        type: getAllAuthorsAction,
        payload: getAllAuthors(),
    }
}