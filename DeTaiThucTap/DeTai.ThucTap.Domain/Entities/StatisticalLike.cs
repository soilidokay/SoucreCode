using DeTai.ThucTap.Data.CustomEntites;
using DeTai.ThucTap.Domain.EntityBases;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
   public class StatisticalLike:StatisticalLikeBase
    {
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
        [ForeignKey("IdVocabulary")]
        public Vocabulary Vocabulary { get; set; }
    }
}
