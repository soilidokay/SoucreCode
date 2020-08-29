using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DeTai.ThucTap.Domain.EntityBases
{
    public class CalendarReminderBase
    {
        public Guid Id { get; set; }
        public Guid? IdLearningGoal { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte TableTime { get; set; }
        [DisplayFormat(DataFormatString = "{0:d}")]
        public long LongTime { get; set; }
        public bool IsLoop { get; set; }
    }
}
