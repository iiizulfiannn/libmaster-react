import Axios from 'axios';

export const URL_API = process.env.REACT_APP_URL_API;

// const authHeader = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     console.log(user)

//     if (user && user.token) {
//         // return { Authorization: 'Bearer ' + user.token }; // for Spring Boot back-end
//         return { 'x-access-token': user.token };
//     } else {
//         return {};
//     }
// }

// Auth Services

export const register = (body) => {
    return Axios.post(`${URL_API}/auth/register`, body);
};

export const login = (body) => {
    return Axios.post(`${URL_API}/auth/login`, body);
};

export const logOut = () => {
    return localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

// Books

export const getAllBooks = (requestData) => {
    return Axios.get(`${URL_API}/books?${requestData}`);
};

export const getAllBooksAdmin = () => {
    return Axios.get(`${URL_API}/books?order=asc`);
};

export const getBook = (id) => {
    return Axios.get(`${URL_API}/books/${id}`);
};

export const addBook = (formData, config) => {
    return Axios.post(`${URL_API}/books`, formData, config);
};

export const updateBook = (id, formData, config) => {
    return Axios.put(`${URL_API}/books/${id}`, formData, config);
};

export const deleteBook = (id) => {
    return Axios.delete(`${URL_API}/books/${id}`);
};

// Borrow

export const getAllBorrow = () => {
    return Axios.get(`${URL_API}/borrow`);
};

export const getBorrowByUser = (idUser) => {
    return Axios.get(`${URL_API}/borrow/${idUser}`);
};
// export const getBook = (id) => {
//     return Axios.get(`${URL_API}/books/${id}`)
// }

export const addBorrow = (data) => {
    return Axios.post(`${URL_API}/borrow`, data);
};

export const returnBook = (data) => {
    return Axios.post(`${URL_API}/borrow/return-book`, data);
};

// export const updateBook = (id, formData, config) => {
//     return Axios.put(`${URL_API}/books/${id}`, formData, config)
// }

// export const deleteBook = (id) => {
//     return Axios.delete(`${URL_API}/books/${id}`)
// }

// User
export const getAllUsers = () => {
    return Axios.get(`${URL_API}/users`);
};

// Genre
export const getAllGenres = () => {
    return Axios.get(`${URL_API}/genres`);
};

// Author
export const getAllAuthors = () => {
    return Axios.get(`${URL_API}/authors`);
};

// Status
export const getAllStatus = () => {
    return Axios.get(`${URL_API}/status`);
};
