using DeTai.ThucTap.Application.Interfaces;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Data.CustomEntites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace DeTai.ThucTap.Application.Implementation
{
    public class ServiceBase : IServiceBase
    {
        protected readonly ApplicationContext _DbContext;
        protected readonly UserManager<ApplicationUser> _UserManager;
        protected readonly SignInManager<ApplicationUser> _SignInManager;
        protected readonly HttpContext _HttpContent;
        public ServiceBase(
            ApplicationContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IHttpContextAccessor httpContextAccessor
            )
        {
            _DbContext = context;
            _UserManager = userManager;
            _SignInManager = signInManager;
            _HttpContent = httpContextAccessor.HttpContext;
        }
    }
}
