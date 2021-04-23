using System;

namespace InvoiceManagementApp.Domain.Common
{
    public class AuditEntity
    {
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
