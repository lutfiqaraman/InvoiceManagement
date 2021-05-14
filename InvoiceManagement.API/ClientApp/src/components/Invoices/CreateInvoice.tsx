import React from 'react';
import { Card, CardBody, Row, Col, Input, FormGroup, Label } from 'reactstrap';

interface ICreateInvoice {

}

const CreateInvoice : React.FC<ICreateInvoice> = ({ }) => {
    return (
        <div className="col-md-12">
            <Card>
                <CardBody>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Input type="text" placeholder="From whom" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" placeholder="Invoice No." />
                            </FormGroup>
                            <FormGroup>
                                <Input type="date" placeholder="Due Date" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Input type="text" placeholder="To whom" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="date" placeholder="Invoice Date" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" placeholder="Payment terms" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Balance: </Label>
                                <Label>8000</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default CreateInvoice;
