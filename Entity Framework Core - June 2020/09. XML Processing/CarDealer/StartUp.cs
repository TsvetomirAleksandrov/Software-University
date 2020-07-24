using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Xml;
using CarDealer.Data;
using Newtonsoft.Json.Converters;
using CarDealer.DataTransferObjects;
using CarDealer.Models;
using XMLFacade;


namespace CarDealer
{
    public class StartUp
    {
        public static void Main(string[] args)
        {
            CarDealerContext carDealerContext = new CarDealerContext();
            carDealerContext.Database.EnsureCreated();

            //Problem 09 - Import Suppliers
            ImportSuppliers(carDealerContext, File.ReadAllText("../../../Datasets/suppliers.xml"));

            //Problem 10 - Import Parts
            ImportParts(carDealerContext, File.ReadAllText("../../../Datasets/parts.xml"));

            //Problem 11 - Import Cars
            ImportCars(carDealerContext, File.ReadAllText("../../../Datasets/cars.xml"));

            //Problem 12 - Import Customers
            ImportCustomers(carDealerContext, File.ReadAllText("../../../Datasets/customers.xml"));

            //Problem 13 - Import Sales
            ImportSales(carDealerContext, File.ReadAllText("../../../Datasets/sales.xml"));
        }

        //Problem 19 - Sales with Applied Discount
        public static string GetSalesWithAppliedDiscount(CarDealerContext context)
        {
            var result = context
                .Sales
                .Select(s => new ExportSaleDto()
                {
                    Car = new ExportCarDto
                    {
                        Make = s.Car.Make,
                        Model = s.Car.Model,
                        TraveledDistance = s.Car.TravelledDistance
                    },

                    Discount = s.Discount,
                    CustomerName = s.Customer.Name,
                    Price = s.Car.PartCars.Sum(p => p.Part.Price),
                    PriceWithDiscount = s.Car.PartCars.Sum(p => p.Part.Price) -
                                        s.Car.PartCars.Sum(p => p.Part.Price) * s.Discount / 100,
                })
                .ToArray();

            var xmlResult = XMLConverter.Serialize(result, "sales");

            return xmlResult;
        }

        //Problem 18 - Total Sales by Customer
        public static string GetTotalSalesByCustomer(CarDealerContext context)
        {
            var result = context
                .Customers
                .Where(c => c.Sales.Count >= 1)
                .Select(x => new ExportTotalSalesByCustomerDto()
                {
                    Name = x.Name,
                    BoughtCars = x.Sales.Count,
                    SpentMoney = x.Sales.Select(s => s.Car.PartCars.Select(pc => pc.Part).Sum(pc => pc.Price)).Sum()
                })
                .OrderByDescending(c => c.SpentMoney)
                .ToArray();

            var xmlResult = XMLConverter.Serialize(result, "customers");

            return xmlResult;
        }

        //Problem 17 - Cars with Their List of Parts
        public static string GetCarsWithTheirListOfParts(CarDealerContext context)
        {
            var result = context
                .Cars
                .Select(x => new ExportCarsWithListOfPartsDto()
                {
                    Make = x.Make,
                    Model = x.Model,
                    TraveledDistance = x.TravelledDistance,
                    PartExportDtos = x.PartCars
                        .Select(pc => new PartExportDto()
                        {
                            Name = pc.Part.Name,
                            Price = pc.Part.Price
                        })
                        .OrderByDescending(p => p.Price)
                        .ToArray()
                })
                .OrderByDescending(c => c.TraveledDistance)
                .ThenBy(c => c.Model)
                .Take(5)
                .ToArray();

            var xmlResult = XMLConverter.Serialize(result, "cars");

            return xmlResult;
        }

        //Problem 16 - Local Suppliers
        public static string GetLocalSuppliers(CarDealerContext context)
        {
            var result = context
                .Suppliers
                .Where(s => !s.IsImporter)
                .Select(x => new ExportLocalSuppliersDto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    PartsCount = x.Parts.Count
                })
                .ToArray();

            var xmlResult = XMLConverter.Serialize(result, "suppliers");

            return xmlResult;
        }

        //Problem 15 - Cars from make BMW
        public static string GetCarsFromMakeBmw(CarDealerContext context)
        {
            var result = context
                .Cars
                .Where(c => c.Make == "BMW")
                .Select(x => new ExportCarBmwDto()
                {
                    Id = x.Id,
                    Model = x.Model,
                    TraveledDistance = x.TravelledDistance
                })
                .OrderBy(c => c.Model)
                .ThenByDescending(c => c.TraveledDistance)
                .ToArray();

            var xmlResult = XMLConverter.Serialize(result, "cars");

            return xmlResult;
        }

        //Problem 14 - Cars With Distance
        public static string GetCarsWithDistance(CarDealerContext context)
        {
            var result = context
                .Cars
                .Where(x => x.TravelledDistance > 2000000)
                .Select(c => new ExportCarsDto()
                {
                    Make = c.Make,
                    Model = c.Model,
                    TraveledDistance = c.TravelledDistance
                })
                .OrderBy(c => c.Make)
                .ThenBy(c => c.Model)
                .Take(10)
                .ToArray();

            var xmlResult = XMLConverter.Serialize(result, "cars");

            return xmlResult;
        }

        //Problem 13 - Import Sales
        public static string ImportSales(CarDealerContext context, string
            inputXml)
        {
            var salesDtos = XMLConverter.Deserializer<ImportSaleDto>(inputXml, "Sales");

            var sales = salesDtos
                .Where(i => context.Cars.Any(x => x.Id == i.CarId))
                .Select(c => new Sale()
                {
                    CarId = c.CarId,
                    CustomerId = c.CustomerId,
                    Discount = c.Discount
                })
                .ToArray();

            context.Sales.AddRange(sales);
            context.SaveChanges();

            return $"Successfully imported {sales.Length}";
        }

        //Problem 12 - Import Customers
        public static string ImportCustomers(CarDealerContext context, string
            inputXml)
        {
            var customerDtos = XMLConverter.Deserializer<ImportCustomerDto>(inputXml, "Customers");

            var customers = customerDtos.Select(x => new Customer
                {
                    Name = x.Name,
                    IsYoungDriver = x.IsYoungDriver,
                    BirthDate = DateTime.Parse(x.BirthDate)
                })
                .ToArray();

            context.Customers.AddRange(customers);
            context.SaveChanges();

            return $"Successfully imported {customers.Length}";
        }

        //Problem 11 - Import Cars
        public static string ImportCars(CarDealerContext context, string inputXml)
        {
            var carsDtos = XMLConverter.Deserializer<ImportCarDto>(inputXml, "Cars");

            var cars = new List<Car>();

            foreach (var carDto in carsDtos)
            {
                var uniqueParts = carDto.Parts.Select(s => s.Id).Distinct().ToArray();
                var realParts = uniqueParts.Where(id => context.Parts.Any(i => i.Id == id));

                var car = new Car()
                {
                    Make = carDto.Make,
                    Model = carDto.Model,
                    TravelledDistance = carDto.TraveledDistance,
                    PartCars = realParts.Select(id => new PartCar()
                        {
                            PartId = id
                        })
                        .ToArray()
                };

                cars.Add(car);
            }

            context.Cars.AddRange(cars);
            context.SaveChanges();

            return $"Successfully imported {cars.Count}";
        }

        //Problem 10 - Import Parts
        public static string ImportParts(CarDealerContext context, string
            inputXml)
        {
            var partsDtos = XMLConverter.Deserializer<ImportPartDto>(inputXml, "Parts");

            var parts = partsDtos
                .Where(p => context.Suppliers.Any(s => s.Id == p.SupplierId))
                .Select(p => new Part
                {
                    Name = p.Name,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    SupplierId = p.SupplierId
                })
                .ToArray();

            context.Parts.AddRange(parts);
            context.SaveChanges();

            return $"Successfully imported {parts.Length}";
        }

        //Problem 09 - Import Suppliers
        public static string ImportSuppliers(CarDealerContext context, string
            inputXml)
        {
            var suppliersDtos = XMLConverter.Deserializer<ImportSupplierDto>(inputXml, "Suppliers");

            var result = suppliersDtos.Select(s => new Supplier
                {
                    Name = s.Name,
                    IsImporter = s.IsImporter
                })
                .ToArray();

            context.Suppliers.AddRange(result);
            context.SaveChanges();

            return $"Successfully imported {result.Length}";
        }
    }
}