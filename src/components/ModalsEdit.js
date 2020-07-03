import React, { Component } from 'react'
import { ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormText, ModalFooter, Button, Col, Modal } from 'reactstrap'

// import { connect } from 'react-redux'
// import { getBookActionAdmin } from '../redux/actions/books'

export class ModalsEdit extends Component {
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
            idBook: null
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            data: nextProps.data
        })
    }

    handleOnChangeEditBook = (event) => {
        let newData = { ...this.state.book };
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

        console.log(event.target.files[0]);
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

        const {
            title,
            image,
            description,
            genre_id,
            author_id,
            status_id,
        } = this.state.data;

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

            console.log(formData, config)

            // await this.props.addBookAction(formData, config)
            // this.props.toggle()
            // this.props.refreshAdmin()
        }
    };

    render() {
        // console.log(this.state.data)
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Add Book</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}>Title</Label>
                                <Col sm={9}>
                                    <Input type="text" name="title" value={this.state.data.title} onChange={this.handleOnChangeEditBook} />
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
                                    <Input type="select" name="genre_id" onChange={this.handleOnChangeEditBook}>
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
                                    <Input type="select" name="author_id" onChange={this.handleOnChangeEditBook}>
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
                                    <Input type="select" name="status_id" onChange={this.handleOnChangeEditBook}>
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
                                    <Input type="textarea" name="description" onChange={this.handleOnChangeEditBook} />
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
                        <Button color="success" onClick={this.handleSubmit}>Update</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default ModalsEdit
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getBookAction: (id) => {
//             dispatch(getBookActionAdmin(id))
//         }
//     }
// }

// export default connect(mapDispatchToProps)(ModalsEdit)
