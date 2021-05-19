import { InvoiceItemViewModel, DiscountType, TaxType, CreateInvoiceCommand } from './api';

export const getSubtotal = (invoiceItems?: InvoiceItemViewModel[]) => {
    let amount = 0;
    if(invoiceItems) {
        invoiceItems.forEach(invoiceItem => {
            if(invoiceItem.qty && invoiceItem.rate) {
                amount += invoiceItem.qty * invoiceItem.rate;
            }
        })
    }

    return amount;
}

export const getDiscount = (amount: number, type: DiscountType, discount?: number) => {
    if(discount)
        return type == DiscountType.Flat ? discount : (amount * (discount / 100));

    return 0;
}

export const getTax = (amount: number, type: TaxType, tax?: number) => {
    if(tax)
        return type == TaxType.Flat ? tax : (amount * (tax / 100));

    return 0;
}

export const getTotal = (invoiceData: CreateInvoiceCommand) => {
    const subTotal = getSubtotal(invoiceData.invoiceItems);
    const discountPrice = subTotal - getDiscount(subTotal, invoiceData.discountType as DiscountType, invoiceData.discount);
    return discountPrice + getTax(subTotal, invoiceData.taxType as TaxType, invoiceData.tax)
}

export const getBalance = (invoiceData: CreateInvoiceCommand) => {
    if(invoiceData && invoiceData.amountPaid)
        return getTotal(invoiceData) - invoiceData.amountPaid;

    return getTotal(invoiceData);
}
