using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Domain.EntityBases
{
    public class PhraseBase
    {
        public Guid Id { get; set; }
        public string Sentence { get; set; }
        public string SentenceVN { get; set; }
        public string Content { get; set; }
        public string ContentVN { get; set; }
        public Guid VocabularyId { get; set; }
    }
}
