using InvoiceManagementApp.Domain.Common;

namespace InvoiceManagementApp.Domain.Entities
{
    public class InvoiceItem : AuditEntity
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public string Item { get; set; }
        public double Qty { get; set; }
        public double Rate { get; set; }
        public Invoice Invoice { get; set; }
    }
}
