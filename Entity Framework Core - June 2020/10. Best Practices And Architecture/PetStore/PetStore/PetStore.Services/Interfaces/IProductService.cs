using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using PetStore.Models;
using PetStore.ServiceModels.Products.InputModels;
using PetStore.ServiceModels.Products.OutputModels;

namespace PetStore.Services.Interfaces
{
    public interface IProductService
    {
        void AddProduct(AddProductInputServiceModel model);

        ICollection<ListAllProductsByProductTypeServiceModel> ListAllByProductType(string type);

        ICollection<ListAllProductsByNameServiceModel> SearchByName(string searchStr, bool caseSensitive);

        ICollection<ListAllProductsServiceModel> GetAll();

        bool RemoveById(string id);

        bool RemoveByName(string name);

        void EditProduct(string id, EditProductInputServiceModel model);
    }
}
