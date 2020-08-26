using DeTai.ThucTap.Domain.Entities;
using DeTai.ThucTap.Domain.EntityBases;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Domain.DTO
{
    public class VocabularyCategoryDTO :VocabularyCategoryBase
    {
        public IFormFile Image { get; set; }
    }
}
