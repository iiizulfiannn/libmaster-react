import React from 'react';
import { Spinner, Row } from 'reactstrap';

export default function Loading() {
    return (
        <Row className="d-flex justify-content-center my-5 text-primary">
            <Spinner style={{ width: '3rem', height: '3rem' }} />
        </Row>
    );
}
