using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using PetStore.Common;
using PetStore.Models.Enumerations;

namespace PetStore.ServiceModels.Products.InputModels
{
    public class AddProductInputServiceModel
    {
        [Required]
        [MinLength(GlobalConstants.ProductNameMinLength)]
        [MaxLength(GlobalConstants.ProductNameMaxLength)]
        public string Name { get; set; }

        [Range(GlobalConstants.PetMinPrice, Double.MaxValue)]
        public decimal Price { get; set; }

        public ProductType ProductType { get; set; }
    }
}
