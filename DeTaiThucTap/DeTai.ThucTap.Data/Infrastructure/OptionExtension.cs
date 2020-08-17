using DeTai.ThucTap.Data.OptionSettings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace DeTai.ThucTap.Data.Infrastructure
{
  public static class OptionExtension
    {
        public static void AddOptionSetting(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddSingleton<JwtSetting>((store) =>
            {
                JwtSetting jwtSetting = new JwtSetting();
                configuration.Bind(nameof(JwtSetting),jwtSetting);
                return jwtSetting;
            });
        }
    }
}
