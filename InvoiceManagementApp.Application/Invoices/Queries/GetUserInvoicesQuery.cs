using InvoiceManagementApp.Application.Invoices.ViewModels;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceManagementApp.Application.Invoices.Queries
{
    public class GetUserInvoicesQuery : IRequest<IList<InvoiceViewModel>>
    {
        public string User { get; set; }
    }
}
