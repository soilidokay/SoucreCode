using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Areas.Identity.Data
{
    public class ContentTypeDetail
    {
        public Guid Id { get; set; }
        public Guid ContentTypeId { get; set; }
        [ForeignKey("ContentTypeId")]
        public ContentType ContentType { get; set; }
        public Guid ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }

    }
}
