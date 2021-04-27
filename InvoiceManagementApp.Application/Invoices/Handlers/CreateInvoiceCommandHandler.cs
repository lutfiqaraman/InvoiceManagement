using InvoiceManagementApp.Application.Common.Interfaces;
using InvoiceManagementApp.Application.Invoices.Commands;
using InvoiceManagementApp.Domain.Entities;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InvoiceManagementApp.Application.Invoices.Handlers
{
    public class CreateInvoiceCommandHandler : IRequestHandler<CreateInvoiceCommand, int>
    {
        private readonly IApplicationDbContext Context;
        public CreateInvoiceCommandHandler(IApplicationDbContext context)
        {
            Context = context;
        }

        public async Task<int> Handle(CreateInvoiceCommand request, CancellationToken cancellationToken)
        {
            var entity = new Invoice
            {
                AmountPaid = request.AmountPaid,
                Date = request.Date,
                DueDate = request.DueDate,
                Discount = request.Discount,
                DiscountType = request.DiscountType,
                From = request.From,
                InvoiceNumber = request.InvoiceNumber,
                PaymentTerms = request.PaymentTerms,
                Tax = request.Tax,
                TaxType = request.TaxType,
                To = request.To,
                InvoiceItems = request.InvoiceItems.Select(i => new InvoiceItem
                {
                    Item = i.Item,
                    Qty  = i.Qty,
                    Rate = i.Rate
                }).ToList()
            };

            Context.Invoices.Add(entity);
            await Context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
