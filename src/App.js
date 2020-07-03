import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import DetailBook from './pages/DetailBook'
import User from './pages/User';

import { Provider } from 'react-redux'
import store from './redux/store'
import Book from './pages/Admin/Book';
import UserAdmin from './pages/Admin/UserAdmin';
import HistoryBorrow from './pages/Admin/HistoryBorrow';

function App() {
    return (
        <>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path={['/', '/books']} exact component={Home} />
                        <Route path='/login' exact component={Login} />
                        <Route path='/register' exact component={Register} />
                        <Route path='/books/:id' exact component={DetailBook} />

                        <Route path='/admin/book' exact component={Book} />
                        <Route path='/admin/user' exact component={UserAdmin} />
                        <Route path='/admin/history-borrow' exact component={HistoryBorrow} />

                        <Route path='/user/:id' exact component={User} />
                    </Switch>
                </Router>
            </Provider>
        </>
    );
}

export default App;
