using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MyCoolCarSystem.Data.Models

{
    using static DataValidations.Make;

    public class Make
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(MaxName)]
        public string Name { get; set; }

        public ICollection<Model> Models { get; set; } = new HashSet<Model>();



    }
}
