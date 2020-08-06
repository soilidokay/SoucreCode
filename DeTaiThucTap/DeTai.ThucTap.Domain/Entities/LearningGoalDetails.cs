using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
    public class LearningGoalDetails
    {
        public Guid IdVocabulary { get; set; }
        [ForeignKey("IdVocabulary")]
        public Vocabulary Vocabulary { get; set; }
        public Guid IdLearningHistory { get; set; }
        [ForeignKey("IdLearningHistory")]
        public LearningGoal LearningHistory { get; set; }
    }
}
