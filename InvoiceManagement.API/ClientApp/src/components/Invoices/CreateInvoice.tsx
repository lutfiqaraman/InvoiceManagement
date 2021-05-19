import React, { useState } from 'react';
import { Card, CardBody, Col, FormGroup, Input, Label, Row, Table, Button, CardFooter } from 'reactstrap';
import { SingleDatePicker } from 'react-dates';
import { CreateInvoiceCommand, DiscountType, InvoiceItemViewModel, TaxType } from '../../utils/api';
import { getTotal, getSubtotal, getBalance } from '../../utils/invoiceUtils';
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
                                <Label md={8} style={{ fontWeight: 'bold' }}>{getBalance(invoiceData)}</Label>
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
                    <Row>
                        <Col md={6}></Col>
                        <Col md={6}>
                            <FormGroup row>
                                <Label md={4}>Subtotal</Label>
                                <Col md={8}>
                                    {getSubtotal(invoiceData.invoiceItems)}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4}>Discount</Label>
                                <Col md={4}>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={invoiceData.discount || ''}
                                        onChange={(evt: any) => setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, discount: evt.target.value ? parseInt(evt.target.value) : undefined }))} />
                                </Col>
                                <Col md={4}>
                                    <Input
                                        type="select"
                                        value={invoiceData.discountType}
                                        onChange={(evt: any) => setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, discountType: evt.target.value }))}>
                                        <option value={DiscountType.Flat}>Flat rate</option>
                                        <option value={DiscountType.Percentage}>Percentage</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4}>Tax</Label>
                                <Col md={4}>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={invoiceData.tax || ''}
                                        onChange={(evt: any) => setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, tax: evt.target.value ? parseInt(evt.target.value) : undefined }))} />
                                </Col>
                                <Col md={4}>
                                    <Input
                                        type="select"
                                        value={invoiceData.taxType}
                                        onChange={(evt: any) => setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, taxType: evt.target.value }))}>
                                        <option value={TaxType.Flat}>Flat rate</option>
                                        <option value={TaxType.Percentage}>Percentage</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4}>Total</Label>
                                <Col md={8}>
                                    {getTotal(invoiceData)}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4}>Amount Paid</Label>
                                <Col md={8}>
                                    <Input type="number"
                                           placeholder="0"
                                           value={invoiceData.amountPaid || ''}
                                           onChange={(evt: any) => setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, amountPaid: evt.target.value ? parseInt(evt.target.value) : undefined }))} />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Button
                        className="btn btn-primary"
                        onClick={() => {}}
                    >Save</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default CreateInvoice;
