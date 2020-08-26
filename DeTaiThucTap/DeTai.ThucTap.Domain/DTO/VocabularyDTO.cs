using DeTai.ThucTap.Domain.EntityBases;
using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Domain.DTO
{
     public class VocabularyDTO :VocabularyBase
    {
        public VocabularyDTO(VocabularyBase vocabularyBase)
        {
            Type type = typeof(VocabularyBase);
            foreach (var item in type.GetProperties())
            {
                item.SetValue(this, item.GetValue(vocabularyBase));
            }
        }
        public IEnumerable<PronunciationBase> Pronunciations { get; set; }
        public IEnumerable<PhraseBase> Phrases { get; set; }
    }
}
