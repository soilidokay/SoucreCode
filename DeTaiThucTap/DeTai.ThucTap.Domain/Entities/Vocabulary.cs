using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Domain.Entities
{
    public class Vocabulary
    {
        public Guid Id { get; set; }
        public string Word { get; set; }
        public string WordVN { get; set; }
        public string Image { get; set; }
        public bool IsShare { get; set; }
        public IEnumerable<Pronuciation> Pronuciations { get; set; }
        public IEnumerable<Phrase> Phrases { get; set; }
        public Guid VocabularyCategoryId { get; set; }
        public VocabularyCategory VocabularyCategory { get; set; }
    }
}
