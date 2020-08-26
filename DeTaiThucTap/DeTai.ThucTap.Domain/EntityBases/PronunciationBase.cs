using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Domain.EntityBases
{
    public class PronunciationBase
    {
        public Guid Id { get; set; }
        public string Transcription { get; set; }
        public string LinkFile { get; set; }
        public string Type { get; set; }
        public Guid VocabularyId { get; set; }
     

    }
}
