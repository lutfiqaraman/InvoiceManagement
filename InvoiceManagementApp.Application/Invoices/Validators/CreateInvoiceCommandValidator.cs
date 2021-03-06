using FluentValidation;
using InvoiceManagementApp.Application.Invoices.Commands;

namespace InvoiceManagementApp.Application.Invoices.Validators
{
    public class CreateInvoiceCommandValidator : AbstractValidator<CreateInvoiceCommand>
    {
        [System.Obsolete]
        public CreateInvoiceCommandValidator()
        {
            RuleFor(v => v.AmountPaid).NotNull();
            RuleFor(v => v.Date).NotNull();
            RuleFor(v => v.From).NotEmpty().MinimumLength(3);
            RuleFor(v => v.To).NotEmpty().MinimumLength(3);
            RuleFor(v => v.InvoiceItems).SetValidator(new MustHaveInvoiceItemPropertyValidator());
        }
    }
}