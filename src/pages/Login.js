import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Container, Form, FormGroup, Input, Button, FormText } from 'reactstrap'
// import { login } from '../utils/http'
import qs from 'querystring'

import '../styles/login.css'
import Logo from '../images/logoLogin.png'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import { loginUserActionCreator, resetStateActionCreator } from '../redux/actions/auth'

toast.configure()
export class Login extends Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        invalid: false,
        empty: false
    }

    notifySuccess = (message) => {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT })
    }

    notifyDanger = (message) => {
        toast.error(message, { position: toast.POSITION.TOP_RIGHT })
    }

    handleFormChange = (e) => {
        this.setState({
            invalid: false,
            empty: false
        })
        let newData = { ...this.state.data }
        newData[e.target.name] = e.target.value
        this.setState({
            data: newData
        })
    }

    handlelogin = async () => {
        const data = {
            email: this.state.data.email,
            password: this.state.data.password
        }

        if (data.email === '' || data.password === '') {
            this.setState({ empty: true })
        } else {
            this.setState({ empty: false })
            await this.props.loginUserAction(qs.stringify(data))

            // await login(qs.stringify(data))
            //     .then(res => {
            //         if (res.status === 204) {
            //             this.setState({
            //                 invalid: true
            //             })
            //         } else {
            //             localStorage.setItem('user', JSON.stringify(res.data.data))
            //             this.notifySuccess(`Welcome, ${res.data.data.fullname}`)
            //             this.props.history.push('/')
            //         }
            //     })
            //     .catch(err => {
            //         this.setState({
            //             invalid: true
            //         })
            //     })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { auth, resetStateAction } = this.props
        if (auth.isFulfilled) {
            this.notifySuccess(auth.message)
            this.props.history.push('/')
            resetStateAction()
        }
        if (prevProps.auth.isInvalid !== auth.isInvalid) {
            this.setState({ invalid: true })
            resetStateAction()
        }
        if (auth.isRejected) {
            this.notifyDanger(auth.message)
            resetStateAction()
        }
    }

    render() {
        // const { auth } = this.props
        return (
            <Container className="themed-container" fluid={true}>
                {/* {auth.isFulfilled ? this.props.history.push('/home') : ''} */}
                <Row>
                    <Col xs='0' sm='0' md='7' className='background'></Col>
                    <Col xs='12' sm='12' md='5' className='centerLogin'>
                        <Form>
                            <FormGroup className='pb-3 text-center'>
                                <div className='mb-3'>
                                    <Link tag={Link} to='/'><img src={Logo} alt='logo' width={70} height={70} /></Link>
                                </div>
                                <h1 className="display-3">Log In</h1>
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" name="email" placeholder="Email" onChange={this.handleFormChange} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" placeholder="Password" onChange={this.handleFormChange} />
                            </FormGroup>
                            {this.state.invalid
                                ? <FormGroup><FormText color="danger">Email or Password wrong</FormText></FormGroup>
                                : ''
                            }
                            {this.state.empty
                                ? <FormGroup><FormText color="danger">Email or Password empty</FormText></FormGroup>
                                : ''
                            }
                            <FormGroup>
                                <Button color='primary' block onClick={this.handlelogin}>Sign In</Button>
                            </FormGroup>
                            <FormGroup>
                                <span>Don't have an account? </span><Link tag={Link} to='/register'>Sign Up</Link>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

// export default Login
const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUserAction: (data) => {
            dispatch(loginUserActionCreator(data))
        },

        resetStateAction: () => {
            dispatch(resetStateActionCreator())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
