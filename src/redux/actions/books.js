import { getAllBooksAction, getAllBooksActionHome, addBookAction, getBookAction, updateBookAction, deleteBookAction, resetStateAction } from './actionTypes'
import { getAllBooksAdmin, getAllBooks, addBook, getBook, updateBook, deleteBook } from '../../utils/http'

export const getAllBooksActionAdmin = () => {
    return {
        type: getAllBooksAction,
        payload: getAllBooksAdmin(),
    }
}

export const getAllBooksActionHomeCreator = (requestData) => {
    return {
        type: getAllBooksActionHome,
        payload: getAllBooks(requestData),
    }
}

export const getBookActionAdmin = (id) => {
    return {
        type: getBookAction,
        payload: getBook(id),
    }
}

export const addBookActionAdmin = (formData, config) => {
    return {
        type: addBookAction,
        payload: addBook(formData, config),
    }
}

export const updateBookActionAdmin = (id, formData, config) => {
    return {
        type: updateBookAction,
        payload: updateBook(id, formData, config),
    }
}

export const deleteBookActionAdmin = (id) => {
    return {
        type: deleteBookAction,
        payload: deleteBook(id),
    }
}

export const resetStateActionCreator = () => {
    return {
        type: resetStateAction,
    }
}