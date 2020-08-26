using DeTai.ThucTap.Domain.EntityBases;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
    public class LearningGoalDetails: LearningGoalDetailsBase
    {
        [ForeignKey("VocabularyId")]
        public Vocabulary Vocabulary { get; set; }
        [ForeignKey("LearningGoalId")]
        public LearningGoal LearningGoal { get; set; }
    }
}
