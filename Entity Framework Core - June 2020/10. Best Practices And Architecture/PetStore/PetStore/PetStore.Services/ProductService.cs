using System;
using System.Collections.Generic;
using System.Text;
using PetStore.Data;
using PetStore.ServiceModels.Products.InputModels;

namespace PetStore.Services
{
    public class ProductService
    {
        private readonly PetStoreDbContext dbContext;

        public ProductService(PetStoreDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void AddProduct(AddProductInputServiceModel model)
        {
            this.dbContext
        }
    }
}
