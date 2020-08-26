using DeTai.ThucTap.Domain.EntityBases;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
    public class Pronunciation : PronunciationBase
    {
       [ForeignKey("VocabularyId")]
        public Vocabulary Vocabulary { get; set; }
        [NotMapped]
        public IFormFile Audio { get; set; }
    }
}
