using DeTai.ThucTap.Data.CustomEntites;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
   public class StatisticalLike
    {
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
        public Guid IdVocabulary { get; set; }
        [ForeignKey("IdVocabulary")]
        public Vocabulary Vocabulary { get; set; }
    }
}
