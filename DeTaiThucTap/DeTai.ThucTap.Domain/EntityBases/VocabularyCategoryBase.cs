using DeTai.ThucTap.Data.CustomEntites;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.EntityBases
{
    public class VocabularyCategoryBase
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string NameVN { get; set; }
        public string ImageUrl { get; set; }
        public bool IsShare { get; set; }
        public bool IsPublish { get; set; }
    }
}
