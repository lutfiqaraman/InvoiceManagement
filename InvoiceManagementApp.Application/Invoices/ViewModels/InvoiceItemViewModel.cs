using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceManagementApp.Application.Invoices.ViewModels
{
    public class InvoiceItemViewModel
    {
        public int Id { get; set; }
        public string Item { get; set; }
        public double Qty { get; set; }
        public double Rate { get; set; }
        public double Amount
        {
            get
            {
                return Qty * Rate;
            }
        }
    }
}
