import React, { Component } from "react";
import { Table, Container, Col, Row, Button, Badge } from "reactstrap";
import { Link } from "react-router-dom";

import "../styles/detailbook.css";
import Loading from "../components/Loading";

import { toast } from "react-toastify";
import { currentUserActionCreator } from "../redux/actions/auth";
import { connect } from "react-redux";
import {
  getBorrowByUserActionCreator,
  returnBookActionCreator,
  resetStateActionCreator,
} from "../redux/actions/borrow";
import qs from "querystring";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.TOP_RIGHT });
  };

  notifyDanger = (message) => {
    toast.error(message, { position: toast.POSITION.TOP_RIGHT });
  };

  getAllBorrows = async () => {
    const idUser = this.props.match.params.id;
    await this.props.getBorrowByUserAction(idUser);
    // this.props.resetStateAction()
  };

  handleReturn = async (borrowId, bookId) => {
    console.log(borrowId, bookId);
    const data = {
      borrowId,
      book_id: bookId,
    };

    await this.props.returnBookAction(qs.stringify(data));
    setTimeout(async () => {
      await this.getAllBorrows();
    }, 2000);
  };

  componentDidMount = () => {
    this.props.currentUserAction();
  };

  // componentDidUpdate = async (prevProps) => {
  //   const { borrow } = this.props
  //   if (prevProps.borrow.isFulfilled !== borrow.isFulfilled) {
  //     this.notifySuccess(borrow.message)
  //   }
  //   if (borrow.isRejected) {
  //     this.notifyDanger(borrow.message)
  //   }
  // }

  componentDidUpdate = (prevProps, prevState) => {
    const { auth } = this.props;
    if (prevProps.auth.currentUser !== auth.currentUser) {
      if (!auth.currentUser || auth.currentUser.role_name !== "User") {
        this.props.history.push("/login");
      } else {
        this.getAllBorrows();
      }
    }
  };

  render() {
    const { borrow } = this.props;

    return (
      <>
        <Container className="themed-container content" fluid={true}>
          <Button
            tag={Link}
            to={"/"}
            className="rounded-circle btn-back"
            color="warning"
          >
            &#8592;
          </Button>
          <Col sm={12} md={{ size: 10, offset: 1 }}>
            <Row>
              <Col className="d-flex justify-content-between mb-2 align-items-center">
                <h1>History Borrow User</h1>
              </Col>
            </Row>
            <Row>
              <Table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Borrow</th>
                    <th>Return</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {BorrowByUser} */}
                  {borrow.isFulfilled
                    ? borrow.borrow.map((borrow, index) => {
                        return (
                          <tr key={borrow.id}>
                            <th scope="row">{borrow.id}</th>
                            <td>{borrow.book_title}</td>
                            <td>{borrow.date_of_borrow}</td>
                            <td>
                              {borrow.date_of_return === null
                                ? ""
                                : borrow.date_of_return}
                            </td>
                            <td>
                              {borrow.date_of_return === null
                                ? "Masih di pinjam"
                                : "Sudah dikembalikan"}
                            </td>
                            <td>
                              {borrow.date_of_return ? (
                                ""
                              ) : (
                                <Badge
                                  color="success"
                                  onClick={() => {
                                    this.handleReturn(
                                      borrow.id,
                                      borrow.book_id
                                    );
                                  }}
                                  style={{ cursor: "pointer" }}
                                  className="mr-1"
                                >
                                  Return
                                </Badge>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
            </Row>

            {borrow.isLoading ? <Loading /> : null}
          </Col>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ borrow, auth }) => {
  return {
    borrow,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    currentUserAction: () => {
      dispatch(currentUserActionCreator());
    },

    getBorrowByUserAction: (idUser) => {
      dispatch(getBorrowByUserActionCreator(idUser));
    },

    returnBookAction: (data) => {
      dispatch(returnBookActionCreator(data));
    },

    resetStateAction: () => {
      dispatch(resetStateActionCreator());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
