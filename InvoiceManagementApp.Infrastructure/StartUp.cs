using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceManagementApp.Infrastructure
{
    public static class StartUp
    {
        public static IServiceCollection ServiceCollection(this IServiceCollection services, IConfiguration configuration)
        {
            return services;
        }
    }
}
