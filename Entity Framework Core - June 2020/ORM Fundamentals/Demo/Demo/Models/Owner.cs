using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Demo.Models
{
    public class Owner
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public ICollection<Cat> Cats { get; set; } = new List<Cat>();
    }
}
