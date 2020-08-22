using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Areas.Identity.Data
{
    public class Issue
    {
        public Guid Id { get; set; }
        [Required]
        public string Summary { get; set; }
        public string Description { get; set; }
        public Guid ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
        public Guid SprintId { get; set; }
        [ForeignKey("SprintId")]
        public Sprint Sprint { get; set; }
        public Guid? IssueParentId { get; set; }
        [ForeignKey("IssueParentId")]
        public Issue IssueParent { get; set; }
        public Guid UserCreatedId { get; set; }
        [ForeignKey("UserCreatedId")]
        public User UserCreated { get; set; }
        public Guid? AssigneeId { get; set; }
        [ForeignKey("AssigneeId")]
        public User Assignee { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
