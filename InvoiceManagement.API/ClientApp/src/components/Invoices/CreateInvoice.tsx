import React, { useState } from 'react';
import { Card, CardBody, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { SingleDatePicker } from 'react-dates';
import { CreateInvoiceCommand, DiscountType, InvoiceItemViewModel } from "../../utils/api";
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

interface ICreateInvoice {

}

const CreateInvoice : React.FC<ICreateInvoice> = ({ }) => {

    const [selectedDateFocus, setSelectedDateFocus]       = useState(false);
    const [selectedDueDateFocus, setSelectedDueDateFocus] = useState(false);

    const initValue = new CreateInvoiceCommand({
        invoiceNumber: '',
        from: '',
        to: '',
        date: undefined,
        paymentTerms: '',
        dueDate: undefined,
        discount: undefined,
        discountType: DiscountType.Percentage,
        amountPaid: undefined,
        invoiceItems: [new InvoiceItemViewModel({
            id: 0,
            item: '',
            qty: undefined,
            rate: undefined,
            amount: 0
        })]
    });
    const [invoiceData, setInvoiceDate] = useState<CreateInvoiceCommand>(initValue);

    return (
        <div className="col-md-12">
            <Card>
                <CardBody>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Input
                                    type='text'
                                    placeholder='From whom'
                                    value={invoiceData.from}
                                    onChange={(evt: any) => setInvoiceDate(new CreateInvoiceCommand({...invoiceData, from: evt.target.value}))}/>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type='text'
                                    placeholder='Invoice No.'
                                    value={invoiceData.invoiceNumber}
                                    onChange={(evt: any) => setInvoiceDate(new CreateInvoiceCommand({...invoiceData, invoiceNumber: evt.target.value}))}/>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type='text'
                                    placeholder='Payment terms'
                                    value={invoiceData.paymentTerms}
                                    onChange={(evt: any) => setInvoiceDate(new CreateInvoiceCommand({...invoiceData, paymentTerms: evt.target.value}))}/>
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup>
                                <Input
                                    type='text'
                                    placeholder='To whom'
                                    value={invoiceData.to}
                                    onChange={(evt: any) => setInvoiceDate(new CreateInvoiceCommand({...invoiceData, to: evt.target.value}))}/>
                            </FormGroup>
                            <FormGroup>
                                <SingleDatePicker
                                    placeholder='Invoice Date'
                                    isOutsideRange={() => false}
                                    id='invoice-date-picker'
                                    small={true}
                                    block={true}
                                    numberOfMonths={1}
                                    date={invoiceData.date ? moment(invoiceData.date) : null}
                                    onDateChange={(date) => {setInvoiceDate(new CreateInvoiceCommand({...invoiceData, date: date ? date.toDate() : undefined}))}}
                                    focused={selectedDateFocus}
                                    onFocusChange={({ focused }) => setSelectedDateFocus(focused)}
                                    hideKeyboardShortcutsPanel={true}
                                />
                            </FormGroup>
                            <FormGroup>
                                <SingleDatePicker
                                    placeholder='Due Date'
                                    isOutsideRange={() => false}
                                    id='due-date-picker'
                                    small={true}
                                    block={true}
                                    numberOfMonths={1}
                                    date={invoiceData.dueDate ? moment(invoiceData.dueDate) : null}
                                    onDateChange={(date) => {setInvoiceDate(new CreateInvoiceCommand({...invoiceData, dueDate: date ? date.toDate() : undefined}))}}
                                    focused={selectedDueDateFocus}
                                    onFocusChange={({ focused }) => setSelectedDueDateFocus(focused)}
                                    hideKeyboardShortcutsPanel={true}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label md={4} style={{ fontWeight: 'bold' }}>Balance</Label>
                                <Label md={8} style={{ fontWeight: 'bold' }}>1000</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default CreateInvoice;
