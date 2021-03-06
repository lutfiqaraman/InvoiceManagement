using FluentValidation.Validators;
using InvoiceManagementApp.Application.Invoices.ViewModels;
using System.Collections.Generic;
using System.Linq;

namespace InvoiceManagementApp.Application.Invoices.Validators
{
    [System.Obsolete]
    public class MustHaveInvoiceItemPropertyValidator : PropertyValidator
    {
        protected override bool IsValid(PropertyValidatorContext context)
        {
            IList<InvoiceItemViewModel> list = context.PropertyValue as IList<InvoiceItemViewModel>;
            return list != null && list.Any();
        }
    }
}