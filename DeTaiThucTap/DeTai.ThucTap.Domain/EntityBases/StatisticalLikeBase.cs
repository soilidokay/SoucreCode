using DeTai.ThucTap.Data.CustomEntites;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.EntityBases
{
   public class StatisticalLikeBase
    {
        public string UserId { get; set; }
        public Guid IdVocabulary { get; set; }
    }
}
