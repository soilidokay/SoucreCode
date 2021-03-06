﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
    public class CalendarReminder
    {
        [Key]
        public Guid IdLearningGoal { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte TableTime { get; set; }
        public int LongTime { get; set; }
        public bool IsLoop { get; set; }
        [ForeignKey("IdLearningGoal")]
        public LearningGoal LearningGoal { get; set; }
    }
}
