import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import qs from 'querystring';
import { logOut } from '../utils/http'
import Logo from '../images/logo.png'

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Input, NavItem, } from 'reactstrap';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapseOpen: false,
      isModalOpen: false,
      requestData: {
        search: '',
        sort: '',
        order: '',
        page: 1,
        limit: 12,
      },
      isFileMax: false,
      isFileType: false,
      typing: false,
      typingTimeOut: 0,
    };
  }

  toggleCollapse = () => {
    this.setState({
      isCollapseOpen: !this.state.isCollapseOpen,
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleOnChange = (event) => {
    const requestData = { ...this.state.requestData };
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'search') {
      if (this.state.typingTimeOut) {
        clearTimeout(this.state.typingTimeOut);
      }
      requestData[name] = value;
      this.setState({
        requestData,
        typing: false,
        typingTimeOut: setTimeout(() => {
          const requestData = {
            search: this.state.requestData.search,
            sort: this.state.requestData.sort,
            order: this.state.requestData.order,
            page: this.state.requestData.page,
            limit: this.state.requestData.limit,
          };
          if (requestData.sort === '') delete requestData.sort;
          if (requestData.order === '') delete requestData.order;
          const queryData = qs.stringify(requestData);
          this.props.history.push(`/books?${queryData}`);
          this.handleGetRequestData(queryData);
        }, 1500),
      });
    } else {
      requestData[name] = value;
      this.setState(
        {
          requestData,
        },
        () => {
          const requestData = {
            search: this.state.requestData.search,
            sort: this.state.requestData.sort,
            order: this.state.requestData.order,
            page: this.state.requestData.page,
            limit: this.state.requestData.limit,
          };
          if (requestData.search === '') delete requestData.search;
          if (requestData.sort === '') delete requestData.sort;
          if (requestData.order === '') delete requestData.order;
          const queryData = qs.stringify(requestData);
          this.props.history.push(`/books?${queryData}`);
          this.handleGetRequestData(queryData);
        }
      );
    }
  };

  handleGetRequestData = (queryData) => {
    this.props.onRequestData(queryData);
  };

  handleLogout = () => {
    logOut()
  }

  render() {
    const { genres, currentUser } = this.props

    return (
      <Navbar expand="md" fixed="top" className="navbar-dark bg-dark shadow p-3 mb-5">
        <NavbarBrand tag={Link} to="/" className='text-light font-weight-bold'>
          <img src={Logo} width={30} height={30} className="d-inline-block align-top mr-1" alt="logo" />
                    LibMaster
                </NavbarBrand>
        <NavbarToggler onClick={this.toggleCollapse} />
        <Collapse isOpen={this.state.isCollapseOpen} className="collapse-custom justify-content-lg-between justify-content-md-between justify-content-xl-between" navbar>
          <Nav navbar className="ml-4 nav-custom-device">
            <UncontrolledDropdown nav inNavbar className="mr-2">
              <Input type="select" name="sort" onChange={this.handleOnChange}>
                <option value={''}>All Genre</option>
                {genres.genres.map((genre) => {
                  return (
                    <option key={genre.id} value={genre.name}>
                      {genre.name}
                    </option>
                  );
                })}
              </Input>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar className="mr-2">
              <Input type="select" name="order" onChange={this.handleOnChange}>
                <option value={''}>All Time</option>
                <option value={'asc'}>Terlama</option>
                <option value={'desc'}>Terbaru</option>
              </Input>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar className="mr-2">
              <Input type="select" name="limit" onChange={this.handleOnChange}>
                <option value={12}>Limit</option>
                <option value={12}>12</option>
                <option value={18}>18</option>
                <option value={24}>24</option>
              </Input>
            </UncontrolledDropdown>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input className="mr-2" type="search" name="search" placeholder="Search..." onChange={this.handleOnChange} />
              </FormGroup>
            </Form>
          </Nav>

          <Nav navbar className='nav-custom-user'>
            {
              currentUser ? (
                currentUser.role_name === 'Superadmin' ?
                  (
                    <UncontrolledDropdown nav inNavbar className="mr-2">
                      <DropdownToggle nav caret>{currentUser.fullname}</DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <NavLink tag={Link} to={'/admin/book'} className='text-dark'>Books</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink tag={Link} to={'/admin/user'} className='text-dark'>Users</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink tag={Link} to={'/admin/history-borrow'} className='text-dark'>History Borrow</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink tag={Link} to={'/login'} onClick={this.handleLogout} className='text-dark'>Logout</NavLink>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) :

                  currentUser.role_name === 'User' ?
                    (
                      <UncontrolledDropdown nav inNavbar className="mr-2 text-dark">
                        <DropdownToggle nav caret>{currentUser.fullname}</DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>
                            <NavLink tag={Link} to={`/user/${currentUser.id}`} className='text-dark'>History</NavLink>
                          </DropdownItem>
                          <DropdownItem>
                            <NavLink tag={Link} to={'/login'} onClick={this.handleLogout} className='text-dark'>Logout</NavLink>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    ) :
                    (
                      <NavItem>
                        <NavLink tag={Link} to={'/login'}>Login</NavLink>
                      </NavItem>
                    )

              ) : (
                  <NavItem>
                    <NavLink tag={Link} to={'/login'}>Login</NavLink>
                  </NavItem>
                )

            }
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavBar = withRouter(NavBar);

