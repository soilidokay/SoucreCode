
using DeTai.ThucTap.Api.Certificates;
using DeTai.ThucTap.Data.CustomEntites;
using DeTai.ThucTap.Data.OptionSettings;
using Microsoft.AspNetCore.Authentication.Certificate;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace DeTai.ThucTap.Data.Infrastructure
{
    public static class JwtExtenstion
    {
        private static string PolicyAdmin = "RequirePolicyAdmin";
        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<ApplicationContext>
            (options => options.UseSqlServer(Configuration.GetConnectionString("ApplicationContextConnection")))
            .AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationContext>()
            .AddDefaultTokenProviders();
            services.AddSingleton<IEmailSender, EmailSender>();
            services.AddSwaggerGen();


            services.AddRazorPages(options =>
            {
                options.Conventions.AuthorizeAreaFolder("Admin", "/", PolicyAdmin);
                options.Conventions.AuthorizeAreaFolder("Identity", "/Account/Manage");
            });

            services.AddControllers().AddJsonOptions(options =>
            {
                // Use the default property (Pascal) casing.
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
                // Configure a custom converter.
                //options.JsonSerializerOptions.Converters.Add(new MyCustomJsonConverter());
            });
            services.AddCertificateForwarding(options =>
            {
                options.CertificateHeader = "X-SSL-CERT";
                options.HeaderConverter = (headerValue) =>
                {
                    X509Certificate2 clientCertificate = null;

                    if (!string.IsNullOrWhiteSpace(headerValue))
                    {
                        byte[] bytes = StringToByteArray(headerValue);
                        clientCertificate = new X509Certificate2(bytes);
                    }

                    return clientCertificate;
                };
            });

            services.AddAuthentication(CertificateAuthenticationDefaults.AuthenticationScheme)
               .AddCertificate(options =>
               {
                   options.AllowedCertificateTypes = CertificateTypes.Chained;
                   options.Events = new CertificateAuthenticationEvents
                   {
                       OnCertificateValidated = context =>
                       {
                           //var validationService =
                           //    context.HttpContext.RequestServices
                           //        .GetService<ICertificateValidationService>();

                           if (MyCertificateValidationService.ValidateCertificate(
                               context.ClientCertificate))
                           {
                               var claims = new[]
                               {
                                    new Claim(
                                        ClaimTypes.NameIdentifier,
                                        context.ClientCertificate.Subject,
                                        ClaimValueTypes.String,
                                        context.Options.ClaimsIssuer),
                                    new Claim(
                                        ClaimTypes.Name,
                                        context.ClientCertificate.Subject,
                                        ClaimValueTypes.String,
                                        context.Options.ClaimsIssuer)
                                };

                               context.Principal = new ClaimsPrincipal(
                                   new ClaimsIdentity(claims, context.Scheme.Name));
                               context.Success();
                           }

                           return Task.CompletedTask;
                       }
                   };
               })
               .AddCookie(options =>
               {
                   options.LoginPath = "/Account/Unauthorized/";
                   options.AccessDeniedPath = "/Account/Forbidden/";
               })
               .AddJwtBearer(options =>
               {
                   var jwtSetting = services.FirstOrDefault(x => x.ServiceType == typeof(JwtSetting)).ImplementationInstance as JwtSetting;
                   //options.Audience = "http://localhost:5001/";
                   //options.Authority = "http://localhost:44313/api";
                   options.SaveToken = true;
                   options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                   {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSetting.SecretKey)),
                       ValidateIssuer = false,
                       ValidateAudience = false,
                       RequireExpirationTime = true,
                       ValidateLifetime = true,

                       //ClockSkew = TimeSpan.Zero
                   };
               });

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;

                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(60);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // User settings.
                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = false;
            });

            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(30);

                options.LoginPath = "/Identity/Account/Login";
                options.AccessDeniedPath = "/Identity/Account/AccessDenied";
                options.SlidingExpiration = true;
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy(PolicyAdmin,
                     policy => policy.RequireRole("Admin"));
            });
            return services;
        }

        private static byte[] StringToByteArray(string hex)
        {
            int NumberChars = hex.Length;
            byte[] bytes = new byte[NumberChars / 2];

            for (int i = 0; i < NumberChars; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            }

            return bytes;
        }

        public static IApplicationBuilder UseJwtAthentication(this IApplicationBuilder app)
        {
            app.UseSwagger();
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            // Enable middleware to serve generated Swagger as a JSON endpoint.

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseRouting();
            app.UseCertificateForwarding();
            app.UseAuthentication();
            app.UseAuthorization();

            return app;
        }
    }
}
