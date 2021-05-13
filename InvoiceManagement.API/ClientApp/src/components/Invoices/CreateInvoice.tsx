import React from 'react';
import { Card, CardBody, Row, Col, Input, FormGroup } from 'reactstrap';

interface ICreateInvoice {

}

const CreateInvoice : React.FC<ICreateInvoice> = ({ }) => {
    return (
        <div className="col-md-12">
            <Card>
                <CardBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Input type="text" placeholder="From whom" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" placeholder="To whom" />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default CreateInvoice;
