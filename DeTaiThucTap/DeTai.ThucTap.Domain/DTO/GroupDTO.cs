using DeTai.ThucTap.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Domain.DTO
{
    public class GroupDTO
    {
        public string Name { get; set; }
        public bool IsOwner { get; set; }
        public IEnumerable<VocabularyCategory> VocabularyCategories { get; set; }
    }
}
