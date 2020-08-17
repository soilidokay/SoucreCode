using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Data.Attributes
{
    public class AuthorizeJWT : AuthorizeAttribute
    {
        public AuthorizeJWT()
        {
            AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme;
        }
    }
}
