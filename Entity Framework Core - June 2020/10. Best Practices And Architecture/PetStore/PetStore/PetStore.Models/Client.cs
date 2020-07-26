using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Text;

namespace PetStore.Models
{
    public class Client
    {
        public Client()
        {
            this.Id = Guid.NewGuid().ToString();
            this.PetsBuyed = new HashSet<Pet>();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        [MinLength(6)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [MinLength(6)]
        public string Email { get; set; }

        [Required]
        [MinLength(3)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(3)]
        public string LastName { get; set; }

        public virtual ICollection<Pet> PetsBuyed { get; set; }
    }
}
