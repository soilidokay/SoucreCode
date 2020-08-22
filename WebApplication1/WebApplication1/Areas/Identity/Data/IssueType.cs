using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Areas.Identity.Data
{
	public class IssueType
	{
		public Guid Id { get; set; }
		public Guid IssueId { get; set; }
		[ForeignKey("IssueId")]
		public Issue Issue { get; set; }
		public Guid ContentTypeDetailId { get; set; }
		[ForeignKey("ContentTypeDetailId")]
		public ContentTypeDetail ContentTypeDetail { get; set; }
	}
}
