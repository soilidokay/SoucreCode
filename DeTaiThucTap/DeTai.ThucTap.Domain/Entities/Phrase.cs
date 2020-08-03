using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
    public class Phrase
    {
        public Guid Id { get; set; }
        public string Sentence { get; set; }
        public string SentenceVN { get; set; }
        public string Content { get; set; }
        public string ContentVN { get; set; }
        public Guid VocabularyId { get; set; }
        public Vocabulary Vocabulary { get; set; }
    }
}
