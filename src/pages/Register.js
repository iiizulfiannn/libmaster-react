import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Container, Form, FormGroup, Input, Button, FormFeedback } from 'reactstrap'
// import { register } from '../utils/http'
import '../styles/login.css'
import Logo from '../images/logoLogin.png'
import qs from 'querystring'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import { registerUserActionCreator, resetStateActionCreator } from '../redux/actions/auth'

toast.configure()
export class Register extends Component {
    state = {
        data: {
            fullname: '',
            email: '',
            password: ''
        },
        emailInvalid: false,
        passInvalid: false,
        fullNameInvalid: false,
        fullNameEmpty: false,
        emailEmpty: false,
        passEmpty: false,

        isFulfilled: this.props.auth.isFulfilled,
        isRejected: this.props.auth.isRejected,
        message: this.props.auth.message
    }

    notifySuccess = (message) => {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT })
    }

    notifyDanger = (message) => {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT })
    }

    handleFormChange = (e) => {
        this.setState({
            emailInvalid: false,
            passInvalid: false,
            fullNameInvalid: false,
            fullNameEmpty: false,
            emailEmpty: false,
            passEmpty: false
        })
        let newData = { ...this.state.data }
        newData[e.target.name] = e.target.value
        this.setState({
            data: newData
        })
    }

    handleRegister = async () => {
        const data = {
            fullname: this.state.data.fullname,
            email: this.state.data.email,
            password: this.state.data.password
        }

        if (this.formValidation(data))
            await this.props.registerUserAction(qs.stringify(data))
    }

    formValidation = (data) => {
        if (data.fullname === '') {
            this.setState({ fullNameEmpty: true })
            return false
        }
        if (data.fullname.length < 8) {
            this.setState({ fullNameInvalid: true })
            return false
        }
        if (data.email === '') {
            this.setState({ emailEmpty: true })
            return false
        }
        if (!data.email.includes('@')) {
            this.setState({ emailInvalid: true })
            return false
        }
        if (data.password === '') {
            this.setState({ passEmpty: true })
            return false
        }
        if (data.password.length < 8) {
            this.setState({ passInvalid: true })
            return false
        }

        return true
    }

    resetForm = () => {
        document.getElementById('form-register').reset()
    }

    componentDidUpdate = () => {
        const { auth, resetStateAction } = this.props
        if (auth.isFulfilled) {
            resetStateAction()
            this.notifySuccess(auth.message)
            this.resetForm()
        }
        if (auth.isRejected) {
            resetStateAction()
            this.notifyDanger(auth.message)
        }
    }

    render() {
        const { emailInvalid, passInvalid, fullNameInvalid, fullNameEmpty, emailEmpty, passEmpty } = this.state

        return (

            <Container className="themed-container" fluid={true}>
                {/* {auth.isFulfilled ? this.props.history.push('/login') : ''} */}

                <Row>
                    <Col xs='0' sm='0' md='7' className='background'></Col>
                    <Col xs='12' sm='12' md='5' className='centerLogin'>
                        <Form id='form-register'>
                            <FormGroup className='pb-3 text-center'>
                                <div className='mb-3'>
                                    <Link tag={Link} to='/'><img src={Logo} alt='logo' width={70} height={70} /></Link>
                                </div>
                                <h1 className="display-3">Register</h1>
                            </FormGroup>
                            <FormGroup>
                                {
                                    fullNameInvalid || fullNameEmpty
                                        ? <Input invalid type="text" name="fullname" placeholder="Full Name" onChange={this.handleFormChange} />
                                        : <Input type="text" name="fullname" placeholder="Full Name" onChange={this.handleFormChange} />
                                }
                                {fullNameInvalid ? <FormFeedback>Minimum 8 character</FormFeedback> : ''}
                                {fullNameEmpty ? <FormFeedback>Fullname Empty</FormFeedback> : ''}
                            </FormGroup>
                            <FormGroup>
                                {
                                    emailInvalid || emailEmpty
                                        ? <Input invalid type="email" name="email" placeholder="Email" onChange={this.handleFormChange} />
                                        : <Input type="email" name="email" placeholder="Email" onChange={this.handleFormChange} />
                                }
                                {emailInvalid ? <FormFeedback>Must have @ character</FormFeedback> : ''}
                                {emailEmpty ? <FormFeedback>Email Empty</FormFeedback> : ''}
                            </FormGroup>
                            <FormGroup>
                                {passInvalid || passEmpty
                                    ? <Input invalid type="password" name="password" placeholder="Password" onChange={this.handleFormChange} />
                                    : <Input type="password" name="password" placeholder="Password" onChange={this.handleFormChange} />
                                }
                                {passInvalid ? <FormFeedback>Minimum 8 character</FormFeedback> : ''}
                                {passEmpty ? <FormFeedback>Password Empty</FormFeedback> : ''}
                            </FormGroup>
                            <FormGroup>
                                <Button color='primary' onClick={this.handleRegister} block>Sign Up</Button>
                            </FormGroup>
                            <FormGroup>
                                <span>Have an account? </span><Link tag={Link} to='/login'>Sign In</Link>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUserAction: (data) => {
            dispatch(registerUserActionCreator(data))
        },

        resetStateAction: () => {
            dispatch(resetStateActionCreator())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
