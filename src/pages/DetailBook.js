import React, { Component } from 'react'
import { Container, Col, Row, Button } from 'reactstrap'
import '../styles/detailbook.css'
import { Link } from 'react-router-dom'
import { URL_API } from '../utils/http'
import { getBookActionAdmin } from '../redux/actions/books'
import { connect } from 'react-redux'
import { addBorrowActionCreator, resetStateActionCreator } from '../redux/actions/borrow'
import { currentUserActionCreator } from '../redux/actions/auth'
import qs from 'querystring'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export class DetailBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: {}
    }
  }

  notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.TOP_RIGHT })
  }

  notifyDanger = (message) => {
    toast.error(message, { position: toast.POSITION.TOP_RIGHT })
  }

  handleGetBook = async () => {
    const id = this.props.match.params.id
    await this.props.getBookAction(id)
  }

  componentDidMount = async () => {
    this.props.resetStateAction()
    this.props.currentUserAction()
    this.handleGetBook()
  }

  handleBorrow = async () => {
    const { books, auth } = this.props

    if (!auth.currentUser || auth.currentUser.role_name !== 'User') {
      this.notifyDanger('Must Login As User')
    } else

      if (auth.currentUser.role_name === 'User') {
        const data = {
          user_id: auth.currentUser.id,
          book_id: books.book.id,
        }
        await this.props.addBorrowAction(qs.stringify(data))
        await this.handleGetBook()

      }
  }

  // componentDidUpdate = async (prevProps) => {
  //   const { borrow } = this.props
  //   if (prevProps.borrow.isFulfilled !== borrow.isFulfilled) {
  //     this.notifySuccess(borrow.message)
  //   }
  //   if (borrow.isRejected) {
  //     this.notifyDanger(borrow.message)
  //   }
  // }

  render() {
    const { books } = this.props
    return (
      // <></>
      <Container className="themed-container" fluid={true} style={{ padding: '0' }}>


        <ToastContainer />

        <Col>
          <Row>
            <Button tag={Link} to={'/'} className="rounded-circle btn-back shadow" color="warning">&#8592;</Button>
            <div className='detail-image'>
              <img className='portrait-image' src={books.book.image ? `${URL_API}/${books.book.image}` : ''} alt="book" />
            </div>
          </Row>
          <Row>
            <div className='thumbnail-abs'>
              <div className='thumbnail'>
                <img className='portrait' src={books.book.image ? `${URL_API}/${books.book.image}` : ''} alt='book-mini' />
              </div>
            </div>
          </Row>
          <Row className='detail-book-small-device'>
            <Col xs={{ size: 10, offset: 1 }} className="mt-5">
              <Button color="warning" className="rounded-pill text-white" >{books.book.genre_name}</Button>
              <Row className='mt-4'>
                <Col md={6}>
                  <h1>{books.book.title}</h1>
                </Col>
                <Col md={3} className="d-flex justify-content-md-end">
                  {
                    books.book.status_name === 'Available'
                      ? <h3 className="text-success">{books.book.status_name}</h3>
                      : <h3 className="text-secondary">{books.book.status_name}</h3>
                  }

                </Col>
              </Row>
              <h5 className="text-secondary"><em>| {books.book.author_name}</em></h5>

              <Row className="my-4">
                <Col md={10}>
                  <p className="text-justify">{books.book.description}</p>
                </Col>
                <Col md={2} className="text-right">
                  {
                    books.book.status_id === 1
                      ? <Button color="warning" size="lg" onClick={this.handleBorrow}>Borrow</Button>
                      : <Button color="secondary" size="lg" disabled>Borrow</Button>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Container>
    )
  }
}

const mapStateToProps = ({ books, auth, borrow }) => { //sebenarnya ini state
  return {
    books, auth, borrow
  }
}

const mapDispatchToProps = (dispatch) => {
  // console.log(dispatch)
  return {
    getBookAction: (id) => {
      dispatch(getBookActionAdmin(id))
    },

    addBorrowAction: (data) => {
      dispatch(addBorrowActionCreator(data))
    },

    currentUserAction: () => {
      dispatch(currentUserActionCreator())
    },

    resetStateAction: () => {
      dispatch(resetStateActionCreator())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailBook)
