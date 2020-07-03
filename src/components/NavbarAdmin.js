import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { logOut } from '../utils/http';


export class NavbarAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCollapseOpen: false,
        }
    }

    toggleCollapse = () => {
        this.setState({
            isCollapseOpen: !this.state.isCollapseOpen,
        });
    };

    handleLogout = () => {
        logOut()
    }

    // toHome = () => {
    //     this.props.history.push('/')
    // }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md" fixed="top" className="shadow p-3 mb-5 bg-light rounded">
                    <NavbarBrand tag={Link} to={'/'}>LibMaster</NavbarBrand>
                    <NavbarToggler onClick={this.toggleCollapse} />
                    <Collapse isOpen={this.state.isCollapseOpen} className="justify-content-lg-between justify-content-md-between justify-content-xl-between" navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="text-primary" tag={Link} to={`/admin/book`}>Book</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-primary" tag={Link} to={`/admin/author`}>Author</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-primary" tag={Link} to={`/admin/genre`}>Genre</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-primary" tag={Link} to={`/admin/user`}>User</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-primary" tag={Link} to={`/admin/history-borrow`}>History Borrow</NavLink>
                            </NavItem>

                        </Nav>
                        <Nav navbar>
                            {
                                this.props.currentUser

                                    ?
                                    <UncontrolledDropdown nav inNavbar className="mr-2">
                                        <DropdownToggle nav caret>{this.props.currentUser.fullname}</DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <NavLink tag={Link} to={'/login'} onClick={this.handleLogout}>Logout</NavLink>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                    :
                                    <NavItem>
                                        <NavLink tag={Link} to={'/login'}>Login</NavLink>
                                    </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavbarAdmin
