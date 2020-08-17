using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Data.OptionSettings
{
    public class JwtSetting
    {
        public string SecretKey { get; set; }
        public int TokenExpireTime { get; set; }
    }
}
