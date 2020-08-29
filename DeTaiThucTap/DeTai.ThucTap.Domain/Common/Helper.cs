using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Domain.Common
{
    public class Helper
    {
        public static string LoginProvider { get; } = "Microsoft";
        public static readonly string Purpose = "access_token";
        public static readonly Guid GroupAdmin = Guid.Parse("8EEBB01A-034F-422A-A4E4-77ADB2584141");
        public static readonly Guid GroupOwner = Guid.Parse("BE4E56C7-FABA-4B48-AE68-568F51B80CA6");
        public static readonly Guid GroupOther = Guid.Parse("7CC96BAD-3D39-4D29-BB0B-C6C222EE8FD6");

        public static readonly string RoleAmidn = "b17504a2-b206-454b-9dfa-78473f95dbce";
        public static readonly string RoleUser = "b3c7a370-3a66-4ba6-ab93-57a5805cc2c9";
        public static readonly string PathImageCategory = "images/VocabularyCategory";
        public static readonly string PathImageVocabulary = "images/Vocabulary";
        public static readonly string PathAudioPronunciation = "Audio/Pronunciation";
    }
}
