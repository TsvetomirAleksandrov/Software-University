using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using PetStore.Common;
using PetStore.Models.Enumerations;

namespace PetStore.Models
{
    public class Product
    {
        public Product()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        [MinLength(GlobalConstants.ProductNameMinLength)]
        public string Name { get; set; }

        public decimal Price { get; set; }

        public ProductType ProductType { get; set; }
    }
}
