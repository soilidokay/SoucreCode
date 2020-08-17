using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeTai.ThucTap.Data.Attributes;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DeTai.ThucTap.Api.Controllers
{
    [AuthorizeJWT]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ApiBaseController : ControllerBase
    {
        
    }
}
