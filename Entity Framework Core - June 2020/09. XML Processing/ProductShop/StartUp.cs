using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using ProductShop.Data;
using ProductShop.Dtos.Export;
using ProductShop.Dtos.Import;
using ProductShop.Models;
using XMLFacade;

namespace ProductShop
{
    public class StartUp
    {
        public static void Main(string[] args)
        {
            using ProductShopContext context = new ProductShopContext();
            ResetDatabase(context);

            //Problem 01 - Import Users
            var usersXml = File.ReadAllText("../../../Datasets/users.xml");
            //var result = ImportUsers(context, usersXml);

            //Problem 02 - Import Products
            var productsXml = File.ReadAllText("../../../Datasets/products.xml");
            //var result = ImportProducts(context, productsXml);

            //Problem 03 - Import Categories
            var categoriesXml = File.ReadAllText("../../../Datasets/categories.xml");

            //Problem 04 - Import Categories and Products
            var categoriesProductsXml = File.ReadAllText("../../../Datasets/categories-products.xml");

            //Problem 05 - Products In Range
            var productsInRange = GetProductsInRange(context);
            File.WriteAllText("../../../results/productsInRange.xml", productsInRange);

            //Problem 06 - Export Sold Products
            var soldProducts = GetProductsInRange(context);
            File.WriteAllText("../../../results/soldProducts.xml", soldProducts);

            //Problem 07 - Categories By Products Count
            var categoriesByProductsCount = GetCategoriesByProductsCount(context);
            File.WriteAllText("../../../results/categoriesByProductsCount.xml", categoriesByProductsCount);

            //Problem 08 - Users and Products
            var usersAndProducts = GetCategoriesByProductsCount(context);
            File.WriteAllText("../../../results/result.xml", categoriesByProductsCount);



            //Console.WriteLine(result);
        }

        private static void ResetDatabase(ProductShopContext dbContext)
        {
            dbContext.Database.EnsureDeleted();
            Console.WriteLine("ProductShop database was successfully deleted!");
            dbContext.Database.EnsureCreated();
            Console.WriteLine("ProductShop database was successfully created!");
        }


        //Problem 08 - Users and Products
        public static string GetUsersWithProducts(ProductShopContext context)
        {
            var usersAndProducts = context
                .Users
                .ToArray()
                .Where(p => p.ProductsSold.Any())
                .Select(x => new ExportUserDto
                {
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Age = x.Age,
                    SoldProduct = new ExportProductCountDto
                    {
                        Count = x.ProductsSold.Count,
                        Products = x.ProductsSold.Select(p => new ExportProductDto
                            {
                                Name = p.Name,
                                Price = p.Price
                            })
                            .OrderByDescending(p => p.Price)
                            .ToArray()
                    }
                })
                .OrderByDescending(x => x.SoldProduct.Count)
                .Take(10)
                .ToArray();


            var resultDto = new ExportUserCountDto
            {
                Count = context.Users.Count(p => p.ProductsSold.Any()),
                Users = usersAndProducts
            };

            var result = XMLConverter.Serialize(resultDto, "Users");

            return result;
        }

        //Problem 07 - Categories By Products Count
        public static string GetCategoriesByProductsCount(ProductShopContext
            context)
        {
            const string rootElement = "Categories";

            var categories = context
                .Categories
                .Select(c => new ExportCategoryDto
                {
                    Name = c.Name,
                    Count = c.CategoryProducts.Count,
                    TotalRevenue = c.CategoryProducts.Sum(p => p.Product.Price),
                    AveragePrice = c.CategoryProducts.Average(p => p.Product.Price)
                })
                .OrderByDescending(c => c.Count)
                .ThenBy(c => c.TotalRevenue)
                .ToArray();


            var result = XMLConverter.Serialize(categories, rootElement);

            return result;
        }

        //Problem 06 - Export Sold Products
        public static string GetSoldProducts(ProductShopContext context)
        {
            const string rootElement = ("Users");

            var usersWithProducts = context
                .Users
                .Where(u => u.ProductsSold.Any())
                .Select(x => new ExportUserSoldProductDto
                {
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    soldProducts = x.ProductsSold.Select(p => new UserProductDto
                    {
                        Name = p.Name,
                        Price = p.Price
                    })
                        .ToArray()
                })
                .OrderBy(l => l.LastName)
                .ThenBy(f => f.FirstName)
                .Take(5)
                .ToArray();

            var result = XMLConverter.Serialize(usersWithProducts, rootElement);

            return result;
        }

        //Problem 05 - Products In Range
        public static string GetProductsInRange(ProductShopContext context)
        {
            const string rootElement = ("Products");

            var products = context
                .Products
                .Where(p => p.Price >= 500 && p.Price <= 1000)
                .Select(x => new ExportProductInfoDto
                {
                    Name = x.Name,
                    Price = x.Price,
                    Buyer = x.Buyer.FirstName + " " + x.Buyer.LastName,
                })
                .OrderBy(p => p.Price)
                .Take(10)
                .ToList();

            var result = XMLConverter.Serialize(products, rootElement);

            return result;
        }

        //Problem 04 - Import Categories and Products
        public static string ImportCategoryProducts(ProductShopContext context,
            string inputXml)
        {
            const string rootElement = "CategoryProducts";

            var categoryProductDtos = XMLConverter.Deserializer<ImportCategoryProductDto>(inputXml, rootElement);

            var categories = categoryProductDtos
                .Where(i => context.Categories.Any(s => s.Id == i.CategoryId) && context.Products.Any(s => s.Id == i.ProductId))
                .Select(c => new CategoryProduct
                {
                    CategoryId = c.CategoryId,
                    ProductId = c.ProductId
                })
                .ToArray();
        

            context.CategoryProducts.AddRange(categories);
            context.SaveChanges();

            return $"Successfully imported {categories.Length}";
        }

        //Problem 03 - Import Categories
        public static string ImportCategories(ProductShopContext context, string
            inputXml)
        {
            const string rootElement = "Categories";

            var categoriesDto = XMLConverter.Deserializer<ImportCategoryDto>(inputXml, rootElement);

            //List<Category> categories = new List<Category>();

            //foreach (var dto in categoriesDto)
            //{
            //    if (dto.Name == null)
            //    {
            //        continue;
            //    }

            //    var category = new Category()
            //    {
            //        Name = dto.Name
            //    };

            //    categories.Add(category);
            //}

            var categories = categoriesDto
                .Where(c => c.Name != null)
                .Select(p => new Category
                {
                    Name = p.Name
                })
                .ToArray();

            context.Categories.AddRange(categories);
            context.SaveChanges();

            return $"Successfully imported {categories.Length}";
        }

        //Problem 02 - Import Products
        public static string ImportProducts(ProductShopContext context, string
            inputXml)
        {
            const string rootElement = "Products";

            var productDtos = XMLConverter.Deserializer<ImportProductDto>(inputXml, rootElement);

            var products = productDtos
                .Select(p => new Product
                {
                    Name = p.Name,
                    Price = p.Price,
                    BuyerId = p.BuyerId,
                    SellerId = p.SellerId
                })
                .ToArray();

            context.Products.AddRange(products);
            context.SaveChanges();

            return $"Successfully imported {products.Length}";
        }

        //Problem 01 - Import Users
        public static string ImportUsers(ProductShopContext context, string
            inputXml)
        {
            const string rootElement = "Users";
            
            var usersResult = XMLConverter.Deserializer<ImportUserDto>(inputXml, rootElement);

            //List<User> users = new List<User>();

            //foreach (var importUserDto in users)
            //{
            //    var user = new User
            //    {
            //        FirstName = importUserDto.FirstName,
            //        LastName = importUserDto.LastName,
            //        Age = importUserDto.Age
            //    };

            //    users.Add(user);
            //}

            var users = usersResult
                .Select(u => new User
                {
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Age = u.Age
                })
                .ToArray();

            context.Users.AddRange(users);
            context.SaveChanges();

            return $"Successfully imported {users.Length}";
        }
    }
}