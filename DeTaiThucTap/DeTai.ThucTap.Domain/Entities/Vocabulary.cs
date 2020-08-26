using DeTai.ThucTap.Domain.EntityBases;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
    public class Vocabulary:VocabularyBase
    {
  
        public IEnumerable<Pronunciation> Pronunciations { get; set; }
        public IEnumerable<Phrase> Phrases { get; set; }
        [ForeignKey("VocabularyCategoryId")]
        public VocabularyCategory VocabularyCategory { get; set; }
        [NotMapped]
        public IFormFile Image { get; set; }
    }
}
