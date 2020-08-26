using DeTai.ThucTap.Application.Implementation;
using DeTai.ThucTap.Application.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Application.Infrastructure
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddAppService(this IServiceCollection services)
        {
            services.AddTransient<IManagerImages, ManagerImagesService>();
            services.AddTransient<IGroupCategoryService, GroupCategoryService>();
            return services;
        }
    }
}
