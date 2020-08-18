﻿
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Areas.Identity.Data
{
    public class ContentType
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Desciption { get; set; }
        public string IconName { get; set; }
        public string Styles { get; set; }
    }
}