using DeTai.ThucTap.Data.CustomEntites;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
    public class VocabularyCategory
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
        public string Name { get; set; }
        public string NameVN { get; set; }
        public bool IsShare { get; set; }
        public bool IsPublish { get; set; }
    }
}
