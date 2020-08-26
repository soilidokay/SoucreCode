using DeTai.ThucTap.Domain.Entities;
using DeTai.ThucTap.Domain.EntityBases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DeTai.ThucTap.Domain.DTO
{
    public class GroupCategoryDTO : GroupCategoryBase
    {
        public GroupCategoryDTO(GroupCategory groupCategory)
        {
            Id = groupCategory.Id;
            Name = groupCategory.Name;
            IsOwner = groupCategory.IsOwner;
            VocabularyCategories = groupCategory.VocabularyCategories;//.Select(x=> x as VocabularyCategoryBase);
        }
        public IEnumerable<VocabularyCategoryBase> VocabularyCategories { get; set; }
    }
}
