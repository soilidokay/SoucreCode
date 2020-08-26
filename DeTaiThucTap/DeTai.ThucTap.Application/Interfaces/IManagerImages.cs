using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeTai.ThucTap.Application.Interfaces
{
    public interface IManagerImages
    {
         Task<string> SaveImageAsync(IFormFile Image, string pathfolder, string idObject);
    }
}
