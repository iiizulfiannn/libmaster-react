import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export class Notification extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     isFulfilled: false,
  //     isRejected: false
  //   }
  // }

  notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.TOP_RIGHT })
  }

  notifyDanger = (message) => {
    toast.error(message, { position: toast.POSITION.TOP_RIGHT })
  }

  componentWillUpdate = (nextProps) => {
    if (nextProps.isFulfilled) {
      this.notifySuccess(nextProps.message)
    }
    if (nextProps.isRejected) {
      this.notifySuccess(nextProps.message)
    }
  }

  render() {
    // const { isFulfilled, isRejected } = this.state
    return (
      <>
        <ToastContainer />
      </>
    )
  }
}

export default Notification
