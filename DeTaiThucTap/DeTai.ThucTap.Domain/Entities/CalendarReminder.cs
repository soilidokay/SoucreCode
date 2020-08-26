using DeTai.ThucTap.Data.CustomEntites;
using DeTai.ThucTap.Domain.EntityBases;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
    public class CalendarReminder : CalendarReminderBase
    {
        [ForeignKey("IdLearningGoal")]
        public LearningGoal LearningGoal { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
    }
}
