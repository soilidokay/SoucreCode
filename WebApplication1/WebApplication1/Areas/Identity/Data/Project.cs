using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Areas.Identity.Data
{
    public class Project
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string UrlImage { get; set; }
        public Guid UserCreatedId { get; set; }
        [ForeignKey("UserCreatedId")]
        public User UserCreated { get; set; }
        public bool IsActive { get; set; }

    }
}
