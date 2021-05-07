using AutoMapper;
using InvoiceManagementApp.Application.Invoices.Commands;
using InvoiceManagementApp.Application.Invoices.ViewModels;
using InvoiceManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceManagementApp.Application.Invoices.MappingProfiles
{
    public class InvoiceMappingProfile : Profile
    {
        public InvoiceMappingProfile()
        {
            CreateMap<Invoice, InvoiceViewModel>();
            CreateMap<InvoiceViewModel, Invoice>();

            CreateMap<InvoiceItemViewModel, InvoiceItem>();
            CreateMap<InvoiceItem, InvoiceItemViewModel>().ConstructUsing(i => new InvoiceItemViewModel
            {
                Id   = i.Id,
                Item = i.Item,
                Qty  = i.Qty,
                Rate = i.Rate
            });

            CreateMap<CreateInvoiceCommand, Invoice>();
        }
    }
}
