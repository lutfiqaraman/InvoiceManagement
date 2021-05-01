using InvoiceManagementApp.Application.Invoices.Commands;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InvoiceManagementApp.API.Controllers
{
    [Authorize]
    public class InvoicesController : ApiController
    {
        public async Task<ActionResult<int>> Create(CreateInvoiceCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
