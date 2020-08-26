using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Domain.EntityBases
{
    public class VocabularyBase
    {
        public Guid Id { get; set; }
        public string Word { get; set; }
        public string WordVN { get; set; }
        public string ImageUrl { get; set; }
        public bool IsShare { get; set; }
        public bool IsPublish { get; set; }
        public Guid VocabularyCategoryId { get; set; }
    }
}
