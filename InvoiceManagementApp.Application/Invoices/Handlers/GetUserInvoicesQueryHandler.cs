using InvoiceManagementApp.Application.Common.Interfaces;
using InvoiceManagementApp.Application.Invoices.Queries;
using InvoiceManagementApp.Application.Invoices.ViewModels;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InvoiceManagementApp.Application.Invoices.Handlers
{
    class GetUserInvoicesQueryHandler : IRequestHandler<GetUserInvoicesQuery, IList<InvoiceViewModel>>
    {
        private readonly IApplicationDbContext Context;

        public GetUserInvoicesQueryHandler(IApplicationDbContext applicationDbContext)
        {
            Context = applicationDbContext;
        }

        public async Task<IList<InvoiceViewModel>> Handle(GetUserInvoicesQuery request, CancellationToken cancellationToken)
        {
            var invoices = 
                await Context
                .Invoices
                .Include(i => i.InvoiceItems)
                .Where(i => i.CreatedBy == request.User)
                .ToListAsync();
            
            List<InvoiceViewModel> viewmodel = 
                invoices.Select(i => new InvoiceViewModel
                {
                    Id = i.Id,
                    AmountPaid = i.AmountPaid,
                    Date = i.Date,
                    Discount = i.Discount,
                    DiscountType = i.DiscountType,
                    DueDate = i.DueDate,
                    From = i.From,
                    InvoiceNumber = i.InvoiceNumber,
                    PaymentTerms = i.PaymentTerms,
                    Tax = i.Tax,
                    TaxType = i.TaxType,
                    To = i.To,

                    InvoiceItems = i.InvoiceItems.Select(i => new InvoiceItemViewModel
                    {
                        Id = i.Id,
                        Item = i.Item,
                        Qty = i.Qty,
                        Rate = i.Rate
                    }).ToList()

                }).ToList();

            return viewmodel;
        }
    }
}
