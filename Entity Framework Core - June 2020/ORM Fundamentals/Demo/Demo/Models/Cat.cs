using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Demo.Models
{
   public class Cat
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public int Age { get; set; }

        public string Color { get; set; }

        public int OwnerId { get; set; }

        public Owner Owner { get; set; }
    }
}
