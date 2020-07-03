import { combineReducers } from "redux";
import books from "./booksReducer";
import authors from "./authorsReducer";
import genres from "./genresReducer";
import status from "./statusReducer";
import auth from "./authReducer";
import borrow from "./borrowReducer";
import users from "./usersReducer";

const rootReducer = combineReducers({
  books,
  authors,
  genres,
  status,
  auth,
  borrow,
  users,
});

export default rootReducer;
