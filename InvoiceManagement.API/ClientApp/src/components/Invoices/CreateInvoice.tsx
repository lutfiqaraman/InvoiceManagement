import React, { useState } from 'react';
import { Card, CardBody, Col, FormGroup, Input, Label, Row, Table, Button } from 'reactstrap';
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
    const [invoiceData, setInvoiceData] = useState<CreateInvoiceCommand>(initValue);

    const updateInvoiceItem = (property: 'item' | 'qty' | 'rate', index: number, value: any) => {
        if (invoiceData && invoiceData.invoiceItems) {
            const items = [...invoiceData.invoiceItems];
            items[index][property] = value;
            setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, invoiceItems: [...items] }));
        }
    }

    const addInvoiceItem = () => {
        if (invoiceData && invoiceData.invoiceItems) {
            const items = [...invoiceData.invoiceItems];
            items.push(new InvoiceItemViewModel({ id: 0, item: '', qty: undefined, rate: undefined, amount: 0 }));
            setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, invoiceItems: [...items] }));
        }
    }

    const removeItem = (index:number) => {
        if (invoiceData && invoiceData.invoiceItems) {
            const items = [...invoiceData.invoiceItems];
            items.splice(index, 1);
            setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, invoiceItems: [...items] }));
        }
    }

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
                                    onChange={(evt: any) => setInvoiceData(new CreateInvoiceCommand({...invoiceData, from: evt.target.value}))}/>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type='text'
                                    placeholder='Invoice No.'
                                    value={invoiceData.invoiceNumber}
                                    onChange={(evt: any) => setInvoiceData(new CreateInvoiceCommand({...invoiceData, invoiceNumber: evt.target.value}))}/>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type='text'
                                    placeholder='Payment terms'
                                    value={invoiceData.paymentTerms}
                                    onChange={(evt: any) => setInvoiceData(new CreateInvoiceCommand({...invoiceData, paymentTerms: evt.target.value}))}/>
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup>
                                <Input
                                    type='text'
                                    placeholder='To whom'
                                    value={invoiceData.to}
                                    onChange={(evt: any) => setInvoiceData(new CreateInvoiceCommand({...invoiceData, to: evt.target.value}))}/>
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
                                    onDateChange={(date) => {setInvoiceData(new CreateInvoiceCommand({...invoiceData, date: date ? date.toDate() : undefined}))}}
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
                                    onDateChange={(date) => {setInvoiceData(new CreateInvoiceCommand({...invoiceData, dueDate: date ? date.toDate() : undefined}))}}
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
                    <Row>
                        <Col md={12}>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th style={{width: '60%'}}>Item</th>
                                        <th>Qty</th>
                                        <th>Rate</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {invoiceData.invoiceItems && invoiceData.invoiceItems.map((invoiceItem: InvoiceItemViewModel, index: number) =>
                                    <tr key={`item-${index}`}>
                                        <td>
                                            <Input
                                                type="text"
                                                placeholder="Item description"
                                                value={invoiceItem.item}
                                                onChange={(evt: any) => updateInvoiceItem('item', index, evt.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                value={invoiceItem.qty || ''}
                                                onChange={(evt: any) => updateInvoiceItem('qty', index, evt.target.value ? parseInt(evt.target.value) : undefined)}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                value={invoiceItem.rate || ''}
                                                onChange={(evt: any) => updateInvoiceItem('rate', index, evt.target.value ? parseInt(evt.target.value) : undefined)}
                                            />
                                        </td>
                                        <td>
                                            {invoiceItem.qty && invoiceItem.rate && invoiceItem.qty * invoiceItem.rate}
                                        </td>
                                        <td><Button color="danger" onClick={() => removeItem(index)}>X</Button></td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                            <Button className="btn btn-primary" onClick={() => addInvoiceItem()}>
                                Add Item
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default CreateInvoice;
