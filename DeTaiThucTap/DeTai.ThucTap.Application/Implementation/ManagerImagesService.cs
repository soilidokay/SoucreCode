using DeTai.ThucTap.Application.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DeTai.ThucTap.Application.Implementation
{
    public class ManagerImagesService : IManagerImages
    {
        public object _MapTree;
        private readonly IWebHostEnvironment _HostContext;

        public ManagerImagesService(IWebHostEnvironment hostingEnvironment)
        {
            _MapTree = null;
            _HostContext = hostingEnvironment;
        }
        public async Task<string> SaveImageAsync(IFormFile Image, string pathfolder, string idObject)
        {
            if (Image != null && Image.Length > 0)
            {
                //string dateTime = DateTime.Now.ToString("dddd, dd MMMM yyyy");

                var file = Image;
                //There is an error here
                var uploads = Path.Combine(_HostContext.WebRootPath, pathfolder);
                if (file.Length > 0)
                {
                    //var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);
                    var filename = idObject + Path.GetExtension(file.FileName);

                    var pathfile = Path.Combine(uploads, filename);
                    //if (System.IO.File.Exists(pathfile))
                    //{
                    //    pathfile = Path.Combine(uploads,+filename);
                    //}
                    if (!Directory.Exists(uploads))
                    {
                        Directory.CreateDirectory(uploads);
                    }

                    using (var fileStream = new FileStream(pathfile, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                        return filename;
                    }

                }
            }
            return null;
        }



    }
}
