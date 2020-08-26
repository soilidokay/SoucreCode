using DeTai.ThucTap.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DeTai.ThucTap.Application.Interfaces
{
    public interface IGroupCategoryService
    {
        Task<List<GroupCategoryDTO>> GetGroupCategories();
    }
}
