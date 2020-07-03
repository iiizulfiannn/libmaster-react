import React, { Component } from 'react'
import { ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormText, ModalFooter, Button, Col, Modal } from 'reactstrap'

import { connect } from 'react-redux'
import { addBookActionAdmin } from '../redux/actions/books'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


toast.configure()

export class ModalsAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                title: '',
                genre_id: 1,
                author_id: 1,
                status_id: 1,
                image: null,
                description: '',
            },
            isEmptyTitle: false,
            isEmptyDescription: false,
            isFileMax: false,
            isFileType: false,
            isEmptyImage: false,
        }
    }

    notifySuccess = (message) => {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT })
    }

    notifyDanger = (message) => {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT })
    }

    handleOnChangeAddBook = (event) => {
        let newData = { ...this.state.data };
        newData[event.target.name] = event.target.value;
        this.setState({
            data: newData,
        });
    };

    handleChangeFile = (event) => {
        this.setState({
            data: {
                ...this.state.data,
                image: null
            },
            isEmptyImage: false,
            isFileMax: false,
            isFileType: false,
        });

        // console.log(event.target.files[0]);
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
        this.setState({
            isEmptyTitle: false,
            isEmptyDescription: false,
            isEmptyImage: false,
        })

        const { title, image, description, genre_id, author_id, status_id, } = this.state.data;

        if (image === null) {
            this.setState({
                isEmptyImage: true
            })
        } else if (title === '') {
            this.setState({
                isEmptyTitle: true
            })
        } else if (description === '') {
            this.setState({
                isEmptyDescription: true
            })
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
                await this.props.addBookAction(formData, config)
                this.props.toggle()
                this.notifySuccess('Success Add Book')
                this.props.refreshAdmin()
            } catch (error) {
                this.props.toggle()
                return this.notifyDanger('Failed Add Book')
            }
        }
    };

    render() {
        // console.log(this.props.isUpdate)
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Add Book</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}>Title</Label>
                                <Col sm={9}>
                                    <Input type="text" name="title" onChange={this.handleOnChangeAddBook} />
                                    {
                                        this.state.isEmptyTitle
                                            ? <FormText color="danger">Title Empty</FormText>
                                            : ''
                                    }
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Genre</Label>
                                <Col sm={9}>
                                    <Input type="select" name="genre_id" onChange={this.handleOnChangeAddBook}>
                                        {
                                            this.props.genres.map(genre => {
                                                return (
                                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Author</Label>
                                <Col sm={9}>
                                    <Input type="select" name="author_id" onChange={this.handleOnChangeAddBook}>
                                        {
                                            this.props.authors.map(author => {
                                                return (
                                                    <option key={author.id} value={author.id}>{author.name}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Status</Label>
                                <Col sm={9}>
                                    <Input type="select" name="status_id" onChange={this.handleOnChangeAddBook}>
                                        {
                                            this.props.status.map(status => {
                                                return (
                                                    <option key={status.id} value={status.id}>{status.name}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Image</Label>
                                <Col sm={9}>
                                    <Input type="file" name="image" onChange={this.handleChangeFile} />
                                    {
                                        this.state.isEmptyImage
                                            ? <FormText color="danger">Image Empty</FormText>
                                            : ''
                                    }
                                    {
                                        this.state.isFileMax
                                            ? <FormText color="danger">Max 1mb</FormText>
                                            : ''
                                    }
                                    {
                                        this.state.isFileType
                                            ? <FormText color="danger">File type must JPG/JPEG/PNG/GIF</FormText>
                                            : ''
                                    }
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Description</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="description" onChange={this.handleOnChangeAddBook} />
                                    {
                                        this.state.isEmptyDescription
                                            ? <FormText color="danger">Description Empty</FormText>
                                            : ''
                                    }
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleSubmit}>Add Book</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = ({ books }) => {
    return {
        isFulfilled: books.isFulfilled,
        isLoading: books.isLoading,
        isRejected: books.isRejected
    }
}

const mapDispatchToProps = (dispatch) => {
    // console.log(dispatch)
    return {
        addBookAction: (formData, config) => {
            dispatch(addBookActionAdmin(formData, config))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalsAdd)
