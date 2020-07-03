import React, { Component } from 'react';
import ReactPaginate from 'react-paginate'
import NavBar from '../components/NavBar';
import ListBook from '../components/ListBook';
import { Container, Row, Col } from 'reactstrap';
// import Carousel from '../components/Carousel'
import qs from 'querystring';

import '../styles/home.css';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import { getAllBooksActionHomeCreator } from '../redux/actions/books';
import { getAllGenresActionAdmin } from '../redux/actions/genres';
import { currentUserActionCreator } from '../redux/actions/auth';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      pagination: '',
      isNotFound: false,
      requestData: {
        page: 1,
        limit: 12,
      },

      newReq: {},
    };
  }

  handleGetAllBooks = async (requestData) => {
    let newreq = {};
    if (!requestData) {
      newreq.page = this.state.requestData.page;
      newreq.limit = this.state.requestData.limit;
      this.props.history.push(`/books?${qs.stringify(newreq)}`);
    }

    this.setState({
      isNotFound: false
    })

    await this.props.getAllBooksActionHome(requestData ? requestData : qs.stringify(newreq))
  };

  handleGetAllGenres = async () => {
    await this.props.getAllGenresAction()
  }

  handlePageClick = (e) => {
    const page1 = parseInt(e.selected)
    const page = page1 + 1

    const params = new URLSearchParams(this.props.location.search)

    let limit = params.get('limit')
    let order = params.get('order')
    let sort = params.get('sort')
    let search = params.get('search')

    const newReq = { search, order, sort, page, limit }

    if (newReq.search === null) delete newReq.search
    if (newReq.order === null) delete newReq.order
    if (newReq.sort === null) delete newReq.sort

    const req = qs.stringify(newReq)
    this.handleGetAllBooks(req)
    this.props.history.push(`/books?${req}`)

  }

  handleDetailBook = (id) => {
    this.props.history.push(`/books/${id}`);
  };

  componentDidMount = () => {
    this.props.currentUserAction()
    this.handleGetAllBooks();
    this.handleGetAllGenres();
  };

  render() {
    const { books, genres, auth } = this.props

    return (
      <>
        {/* COMPONENT - NAVBAR */}
        <NavBar
          onRequestData={(val) => this.handleGetAllBooks(val)}
          genres={genres}
          currentUser={auth.currentUser}
        />

        {/* SIDEBAR */}

        {/* CONTENT */}
        <Container className="themed-container content " fluid={true}>
          <Col sm={12} md={{ size: 10, offset: 1 }}>

            {/* COMPONENT - CAROUSEL */}
            {/* <Row className="most-viewer-title my-3 pt-3 pl-3">
                            <h1>Most Viewer</h1>
                        </Row>
                        <Row>
                            <Carousel />
                        </Row> */}

            {/* COMPONENT - LISTBOOK */}
            <Row className="top-list-book pl-3">
              <h1>List Book</h1>
            </Row>

            {books.isLoading ? <Loading /> : null}

            <Row>
              {books.isRejected ? (
                <h2 className="display 2">Data Not Found</h2>
              ) : (
                  books.books.map((book) => {
                    return (
                      <Col xs={12} sm={6} md={4} lg={3} className="top-card" key={book.id}>
                        <ListBook
                          book={book}
                          onDetailBook={this.handleDetailBook}
                        />
                      </Col>
                    );
                  })
                )}
            </Row>

            {/* PAGINATION */}
            <Row className="pt-5">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={books.pagination.total_page}
                marginPagesDisplayed={0}
                pageRangeDisplayed={2}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </Row>
            <Row className="mt-5"></Row>

          </Col>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ books, genres, auth }) => { //sebenarnya ini state
  return {
    books, genres, auth
  }
}

const mapDispatchToProps = (dispatch) => {
  // console.log(dispatch)
  return {
    getAllBooksActionHome: (requestData) => {
      dispatch(getAllBooksActionHomeCreator(requestData))
    },

    getAllGenresAction: () => {
      dispatch(getAllGenresActionAdmin())
    },

    currentUserAction: () => {
      dispatch(currentUserActionCreator())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
