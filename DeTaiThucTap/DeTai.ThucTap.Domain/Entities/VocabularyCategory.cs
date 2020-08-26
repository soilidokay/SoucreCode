using DeTai.ThucTap.Data.CustomEntites;
using DeTai.ThucTap.Domain.EntityBases;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
    public class VocabularyCategory:VocabularyCategoryBase
    {
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
        [NotMapped]
        public IFormFile Image { get; set; }
        public IEnumerable<Vocabulary> Vocabularies { get; set; }
    }
}
