using DeTai.ThucTap.Data.CustomEntites;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.EntityBases
{
    public class LearningGoalBase
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public string Name { get; set; }
        public int AmountVocabulary { get; set; }
    }
}
