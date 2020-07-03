import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import { URL_API } from '../utils/http'
import './../styles/listBook.css'

export class ListBook extends Component {
    render() {
        return (
            <Card className='round-card shadow-sm bg-light' onClick={() => this.props.onDetailBook(this.props.book.id)}>
                <CardImg top width='100%' src={`${URL_API}/${this.props.book.image}`} alt="book" className='round-card-image' />
                <CardBody>
                    <CardTitle className="font-weight-bold">{this.props.book.title}</CardTitle>
                    <CardSubtitle className="font-italic">{this.props.book.author_name}</CardSubtitle>
                    <CardText></CardText>
                </CardBody>
            </Card>
        )
    }
}

export default ListBook
