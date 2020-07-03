import { resetStateAction, addBorrowAction, getBorrowByUserAction, returnBookAction, getAllBorrowAction } from './actionTypes'
import { addBorrow, getBorrowByUser, returnBook, getAllBorrow } from '../../utils/http'

export const getBorrowByUserActionCreator = (idUser) => {
    return {
        type: getBorrowByUserAction,
        payload: getBorrowByUser(idUser),
    }
}

export const getAllBorrowActionCreator = () => {
    return {
        type: getAllBorrowAction,
        payload: getAllBorrow(),
    }
}

export const addBorrowActionCreator = (data) => {
    return {
        type: addBorrowAction,
        payload: addBorrow(data),
    }
}

export const returnBookActionCreator = (data) => {
    return {
        type: returnBookAction,
        payload: returnBook(data),
    }
}

// export const updateBookActionAdmin = (id, formData, config) => {
//     return {
//         type: updateBookAction,
//         payload: updateBook(id, formData, config),
//     }
// }

// export const deleteBookActionAdmin = (id) => {
//     return {
//         type: deleteBookAction,
//         payload: deleteBook(id),
//     }
// }

export const resetStateActionCreator = () => {
    return {
        type: resetStateAction,
    }
}