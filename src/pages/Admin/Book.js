import React, { Component } from 'react';
import {
    Table,
    Container,
    Col,
    Row,
    Button,
    Badge,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    ModalFooter,
    Modal,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import {
    getAllBooksActionAdmin,
    getBookActionAdmin,
    updateBookActionAdmin,
    deleteBookActionAdmin,
    resetStateActionCreator,
} from '../../redux/actions/books';
import { getAllAuthorsActionAdmin } from '../../redux/actions/authors';
import { getAllGenresActionAdmin } from '../../redux/actions/genres';
import { getAllStatusActionAdmin } from '../../redux/actions/status';

import ModalsAdd from '../../components/ModalsAdd';
import { URL_API } from '../../utils/http';

import '../../styles/detailbook.css';
import Loading from '../../components/Loading';

import { currentUserActionCreator } from '../../redux/actions/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            idBook: null,

            data: {
                title: '',
                genre_id: 1,
                author_id: 1,
                status_id: 1,
                image: null,
                description: '',
            },

            isModalOpenAdd: false,
            isModalOpenEdit: false,
            isEmptyTitle: false,
            isEmptyDescription: false,
            isFileMax: false,
            isFileType: false,
            isEmptyImage: false,
        };
    }

    notifySuccess = (message) => {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    };

    notifyDanger = (message) => {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    };

    getAllBooks = async () => {
        await this.props.getAllBooksAction();
    };

    getAllAuthors = async () => {
        await this.props.getAllAuthorsAction();
    };

    getAllGenres = async () => {
        await this.props.getAllGenresAction();
    };

    getAllStatus = async () => {
        await this.props.getAllStatusAction();
    };

    toggleModalAdd = () => {
        this.setState({
            isModalOpenAdd: !this.state.isModalOpenAdd,
        });
    };

    toggleModalEdit = () => {
        this.handleValid();
        this.setState({
            isModalOpenEdit: !this.state.isModalOpenEdit,
        });
    };

    changeIdEdit = (id) => {
        this.setState(
            {
                idBook: id,
            },
            () => {
                // console.log(this.state.idBook)
                const req = this.state.idBook;
                const modalData = this.props.books.books[req];
                this.setState({
                    data: modalData,
                });
                this.toggleModalEdit();
            }
        );
    };

    handleDelete = async (id) => {
        await this.props.deleteBookAction(id);
        // this.notifySuccess(`Delete with #id${id} Success`)
    };

    handleOnChangeEditBook = (event) => {
        let newData = { ...this.state.data };
        newData[event.target.name] = event.target.value;
        this.setState({
            data: newData,
        });
    };

    handleValid = () => {
        this.setState({
            isEmptyTitle: false,
            isEmptyDescription: false,
            isEmptyImage: false,
        });
    };

    handleChangeFile = (event) => {
        this.setState({
            data: {
                ...this.state.data,
                image: null,
            },
            isEmptyImage: false,
            isFileMax: false,
            isFileType: false,
        });

        const file = event.target.files[0];
        const fileType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
        if (file.size > 1000000) {
            this.setState({
                isFileMax: true,
            });
        } else if (!fileType.includes(file.type)) {
            this.setState({
                isFileMax: false,
                isFileType: true,
            });
        } else {
            this.setState({
                isFileType: false,
                data: {
                    ...this.state.data,
                    image: event.target.files[0],
                },
            });
        }
    };

    handleSubmit = async () => {
        this.handleValid();

        const {
            id,
            title,
            image,
            description,
            genre_id,
            author_id,
            status_id,
        } = this.state.data;

        if (title === '') {
            this.setState({
                isEmptyTitle: true,
            });
        } else if (description === '') {
            this.setState({
                isEmptyDescription: true,
            });
        } else if (image === null) {
            this.setState({
                isEmptyImage: true,
            });
        } else {
            const formData = new FormData();
            formData.set('title', title);
            formData.set('description', description);
            formData.set('genre_id', genre_id);
            formData.set('author_id', author_id);
            formData.set('status_id', status_id);
            formData.append('image', image);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            try {
                await this.props.updateBookAction(id, formData, config);
                // await this.getAllBooks()
                this.toggleModalEdit();
            } catch (error) {
                this.getAllBooks();
                if (this.props.books.books.isRejected)
                    this.notifyDanger(this.props.books.books.message);
                this.toggleModalEdit();
            }
        }
    };

    componentDidMount = () => {
        this.props.currentUserAction();
    };

    componentDidUpdate = (prevProps, prevState) => {
        const { auth } = this.props;
        if (prevProps.auth.currentUser !== auth.currentUser) {
            if (
                !auth.currentUser ||
                auth.currentUser.role_name !== 'Superadmin'
            ) {
                this.props.history.push('/login');
            } else {
                this.getAllBooks();
                this.getAllAuthors();
                this.getAllGenres();
                this.getAllStatus();
                // this.props.resetStateAction()
            }
        }
    };

    render() {
        const { books, authors, genres, status } = this.props;
        return (
            <>
                <Container className="themed-container content" fluid={true}>
                    <Button
                        tag={Link}
                        to={'/'}
                        className="rounded-circle btn-back"
                        color="warning"
                    >
                        &#8592;
                    </Button>
                    <Col sm={12} md={{ size: 10, offset: 1 }}>
                        <Row>
                            <Col className="d-flex justify-content-between mb-2 align-items-center">
                                <h1>Book Page</h1>
                                <div>
                                    <Button
                                        color="primary"
                                        outline
                                        size="sm"
                                        onClick={this.toggleModalAdd}
                                    >
                                        ADD BOOK
                                    </Button>
                                    <ModalsAdd
                                        // refreshAdmin={this.getAllBooks}
                                        modal={this.state.isModalOpenAdd}
                                        toggle={this.toggleModalAdd}
                                        authors={authors.authors}
                                        genres={genres.genres}
                                        status={status.status}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Title</th>
                                        <th>Genre</th>
                                        <th>Author</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {/* {Books} */}
                                    {books.isFulfilled
                                        ? books.books.map((book, index) => {
                                              return (
                                                  <tr key={book.id}>
                                                      <th scope="row">
                                                          {book.id}
                                                      </th>
                                                      <td>
                                                          {book.title.slice(
                                                              0,
                                                              10
                                                          )}
                                                          ...
                                                      </td>
                                                      <td>{book.genre_name}</td>
                                                      <td>
                                                          {book.author_name}
                                                      </td>
                                                      <td>
                                                          {book.description.slice(
                                                              0,
                                                              10
                                                          )}
                                                          ...
                                                      </td>
                                                      <td>
                                                          <img
                                                              src={`${URL_API}/${book.image}`}
                                                              alt={`${book.title}`}
                                                              style={{
                                                                  width: '40px',
                                                              }}
                                                          />
                                                      </td>
                                                      <td>
                                                          {book.status_name}
                                                      </td>
                                                      <td>
                                                          <Badge
                                                              color="success"
                                                              onClick={() => {
                                                                  this.changeIdEdit(
                                                                      index
                                                                  );
                                                              }}
                                                              style={{
                                                                  cursor:
                                                                      'pointer',
                                                              }}
                                                              className="mr-1"
                                                          >
                                                              Edit
                                                          </Badge>
                                                          <Badge
                                                              color="danger"
                                                              onClick={() => {
                                                                  this.handleDelete(
                                                                      book.id
                                                                  );
                                                              }}
                                                              style={{
                                                                  cursor:
                                                                      'pointer',
                                                              }}
                                                          >
                                                              Delete
                                                          </Badge>
                                                      </td>
                                                  </tr>
                                              );
                                          })
                                        : null}
                                </tbody>
                            </Table>

                            {/* MODAL EDIT */}
                            <Modal
                                isOpen={this.state.isModalOpenEdit}
                                toggle={this.toggleModalEdit}
                            >
                                <ModalHeader toggle={this.toggleModalEdit}>
                                    Edit Book
                                </ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup row>
                                            <Label sm={3}>Title</Label>
                                            <Col sm={9}>
                                                {/* <Input type="text" name="title" onChange={this.handleOnChangeEditBook} /> */}
                                                <Input
                                                    type="text"
                                                    name="title"
                                                    value={
                                                        this.state.data.title
                                                    }
                                                    onChange={
                                                        this
                                                            .handleOnChangeEditBook
                                                    }
                                                />
                                                {this.state.isEmptyTitle ? (
                                                    <FormText color="danger">
                                                        Title Empty
                                                    </FormText>
                                                ) : (
                                                    ''
                                                )}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm={3}>Genre</Label>
                                            <Col sm={9}>
                                                {/* <Input type="select" name="genre_id" onChange={this.handleOnChangeEditBook}> */}
                                                <Input
                                                    type="select"
                                                    name="genre_id"
                                                    value={
                                                        this.state.data.genre_id
                                                    }
                                                    onChange={
                                                        this
                                                            .handleOnChangeEditBook
                                                    }
                                                >
                                                    {genres.genres.map(
                                                        (genre) => {
                                                            return (
                                                                <option
                                                                    key={
                                                                        genre.id
                                                                    }
                                                                    value={
                                                                        genre.id
                                                                    }
                                                                >
                                                                    {genre.name}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm={3}>Author</Label>
                                            <Col sm={9}>
                                                {/* <Input type="select" name="author_id" onChange={this.handleOnChangeEditBook}> */}
                                                <Input
                                                    type="select"
                                                    name="author_id"
                                                    value={
                                                        this.state.data
                                                            .author_id
                                                    }
                                                    onChange={
                                                        this
                                                            .handleOnChangeEditBook
                                                    }
                                                >
                                                    {authors.authors.map(
                                                        (author) => {
                                                            return (
                                                                <option
                                                                    key={
                                                                        author.id
                                                                    }
                                                                    value={
                                                                        author.id
                                                                    }
                                                                >
                                                                    {
                                                                        author.name
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm={3}>Status</Label>
                                            <Col sm={9}>
                                                {/* <Input type="select" name="status_id" onChange={this.handleOnChangeEditBook}> */}
                                                <Input
                                                    type="select"
                                                    name="status_id"
                                                    value={
                                                        this.state.data
                                                            .status_id
                                                    }
                                                    onChange={
                                                        this
                                                            .handleOnChangeEditBook
                                                    }
                                                >
                                                    {status.status.map(
                                                        (status) => {
                                                            return (
                                                                <option
                                                                    key={
                                                                        status.id
                                                                    }
                                                                    value={
                                                                        status.id
                                                                    }
                                                                >
                                                                    {
                                                                        status.name
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm={3}>Image</Label>
                                            <Col sm={9}>
                                                <Input
                                                    type="file"
                                                    name="image"
                                                    onChange={
                                                        this.handleChangeFile
                                                    }
                                                />
                                                {this.state.isEmptyImage ? (
                                                    <FormText color="danger">
                                                        Image Empty
                                                    </FormText>
                                                ) : (
                                                    ''
                                                )}
                                                {this.state.isFileMax ? (
                                                    <FormText color="danger">
                                                        Max 1mb
                                                    </FormText>
                                                ) : (
                                                    ''
                                                )}
                                                {this.state.isFileType ? (
                                                    <FormText color="danger">
                                                        File type must
                                                        JPG/JPEG/PNG/GIF
                                                    </FormText>
                                                ) : (
                                                    ''
                                                )}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm={3}>Description</Label>
                                            <Col sm={9}>
                                                {/* <Input type="textarea" name="description" onChange={this.handleOnChangeEditBook} /> */}
                                                <Input
                                                    type="textarea"
                                                    name="description"
                                                    value={
                                                        this.state.data
                                                            .description
                                                    }
                                                    onChange={
                                                        this
                                                            .handleOnChangeEditBook
                                                    }
                                                />
                                                {this.state
                                                    .isEmptyDescription ? (
                                                    <FormText color="danger">
                                                        Description Empty
                                                    </FormText>
                                                ) : (
                                                    ''
                                                )}
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="success"
                                        onClick={this.handleSubmit}
                                    >
                                        Update
                                    </Button>{' '}
                                    <Button
                                        color="secondary"
                                        onClick={this.toggleModalEdit}
                                    >
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </Row>

                        {books.isLoading ? <Loading /> : null}
                    </Col>
                </Container>
            </>
        );
    }
}

const mapStateToProps = ({ books, authors, genres, status, auth }) => {
    //sebenarnya ini state
    return {
        books,
        authors,
        genres,
        status,
        auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    // console.log(dispatch)
    return {
        getAllBooksAction: () => {
            dispatch(getAllBooksActionAdmin());
        },

        getBookAction: (id) => {
            dispatch(getBookActionAdmin(id));
        },

        updateBookAction: (id, formData, config) => {
            dispatch(updateBookActionAdmin(id, formData, config));
        },

        deleteBookAction: (id) => {
            dispatch(deleteBookActionAdmin(id));
        },

        getAllAuthorsAction: () => {
            dispatch(getAllAuthorsActionAdmin());
        },

        getAllGenresAction: () => {
            dispatch(getAllGenresActionAdmin());
        },

        getAllStatusAction: () => {
            dispatch(getAllStatusActionAdmin());
        },

        currentUserAction: () => {
            dispatch(currentUserActionCreator());
        },

        resetStateAction: () => {
            dispatch(resetStateActionCreator());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
