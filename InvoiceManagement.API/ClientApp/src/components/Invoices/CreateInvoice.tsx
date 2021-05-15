import React, { useState }  from 'react';
import moment from 'moment';
import { Card, CardBody, Row, Col, Input, FormGroup, Label } from 'reactstrap';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

interface ICreateInvoice {

}

const CreateInvoice : React.FC<ICreateInvoice> = ({ }) => {
    const [selectedDateFocus, setSelectedDateFocus] = useState(false);
    const [selectedDueDateFocus, setSelectedDueDateFocus] = useState(false);

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
                                <SingleDatePicker
                                    placeholder="Due Date"
                                    isOutsideRange={() => false}
                                    id="due-date-picker"
                                    small={true}
                                    block={true}
                                    numberOfMonths={1}
                                    date={null}
                                    onDateChange={() => {}}
                                    focused={selectedDueDateFocus}
                                    onFocusChange={({ focused }) => setSelectedDueDateFocus(focused)}
                                    hideKeyboardShortcutsPanel={true}
                                />
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
