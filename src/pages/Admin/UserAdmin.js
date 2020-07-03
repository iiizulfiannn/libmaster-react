import React, { Component } from 'react'
import { Table, Container, Col, Row, Button, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'

import '../../styles/detailbook.css'
import Loading from '../../components/Loading';

import { currentUserActionCreator } from '../../redux/actions/auth';
import { getAllUsersActionCreator } from '../../redux/actions/users';

// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// toast.configure()
export class UserAdmin extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // notifySuccess = (message) => {
  //     toast.success(message, { position: toast.POSITION.TOP_RIGHT })
  // }

  // notifyDanger = (message) => {
  //     toast.error(message, { position: toast.POSITION.TOP_RIGHT })
  // }

  getAllUsers = async () => {
    await this.props.getAllUsersAction()
  }

  componentDidMount = () => {
    this.props.currentUserAction();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { auth, } = this.props
    if (prevProps.auth.currentUser !== auth.currentUser) {
      if (!auth.currentUser || auth.currentUser.role_name !== 'Superadmin') {
        this.props.history.push('/login')
      } else {
        this.getAllUsers()
      }
    }
  }

  render() {
    const { users } = this.props
    return (
      <>
        <Container className="themed-container content" fluid={true}>
          <Button tag={Link} to={'/'} className="rounded-circle btn-back" color="warning">&#8592;</Button>
          <Col sm={12} md={{ size: 10, offset: 1 }}>
            <Row>
              <Col className="d-flex justify-content-between mb-2 align-items-center">
                <h1>All Users</h1>
              </Col>
            </Row>
            <Row>
              <Table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {BorrowByUser} */}
                  {
                    users.isFulfilled ?
                      users.users.map((user, index) => {
                        return (
                          <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>{user.role_name}</td>
                            <td>

                              <Badge
                                color="success"
                                // onClick={() => { this.handleReturn(user.id, user.book_id) }}
                                style={{ cursor: 'pointer' }}
                                className="mr-1">
                                edit
                                                                </Badge>
                              <Badge
                                color="danger"
                                // onClick={() => { this.handleReturn(user.id, user.book_id) }}
                                style={{ cursor: 'pointer' }}
                                className="mr-1">
                                delete
                                                                </Badge>


                            </td>
                          </tr>
                        )
                      }) : null
                  }
                </tbody>

              </Table>

            </Row>

            {users.isLoading ? <Loading /> : null}
          </Col>
        </Container>
      </>
    )
  }
}

const mapStateToProps = ({ users, auth }) => {
  return {
    users, auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentUserAction: () => {
      dispatch(currentUserActionCreator())
    },

    getAllUsersAction: () => {
      dispatch(getAllUsersActionCreator())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin)


