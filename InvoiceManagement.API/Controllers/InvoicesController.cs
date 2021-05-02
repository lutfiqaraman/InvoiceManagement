using InvoiceManagementApp.Application.Common.Interfaces;
using InvoiceManagementApp.Application.Invoices.Commands;
using InvoiceManagementApp.Application.Invoices.Queries;
using InvoiceManagementApp.Application.Invoices.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InvoiceManagementApp.API.Controllers
{
    [Authorize]
    public class InvoicesController : ApiController
    {
        private readonly ICurrentUserService CurrentUserService;

        public InvoicesController(ICurrentUserService currentUserService)
        {
            CurrentUserService = currentUserService;
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateInvoice(CreateInvoiceCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<IList<InvoiceViewModel>> GetAllInvoices()
        {
            return await Mediator.Send(new GetUserInvoicesQuery
            {
                User = CurrentUserService.UserId
            });
        }
    }
}
