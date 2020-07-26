using System;
using System.Collections.Generic;
using System.Text;
using PetStore.Models.Enumerations;

namespace PetStore.ServiceModels.Products.OutputModels
{
    public class ListAllProductsServiceModel
    {
        public string Name { get; set; }

        public string ProductType { get; set; }

        public decimal Price { get; set; }
    }
}
