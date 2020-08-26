using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Domain.EntityBases
{
    public class GroupCategoryBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsOwner { get; set; }
    }
}
