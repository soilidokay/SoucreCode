using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.EntityBases
{
    public class LearningGoalDetailsBase
    {
        public Guid VocabularyId { get; set; }
        public Guid LearningGoalId { get; set; }
    }
}
