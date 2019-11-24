using System;
using System.Collections.Generic;
using System.Text;

namespace ShoppingSpree
{
    public class Person
    {
        private string name;
        private decimal money;
        private List<Product> bagOfProducts;

        public Person(string name, decimal price)
        {
            this.Name = name;
            this.Money = price;
            this.bagOfProducts = new List<Product>();
        }

        public IReadOnlyCollection<Product> BagOfProducts
        {
            get { return this.bagOfProducts; }
        }

        public decimal Money
        {
            get { return this.money; }
            set
            {
                if (value < 0)
                {
                    Console.WriteLine("Money cannot be negative");
                    throw new ArgumentException();
                }
                this.money = value;
            }
        }

        public string Name
        {
            get { return this.name; }
            set
            {
                if (value == string.Empty)
                {
                    Console.WriteLine("Name cannot be empty");
                    throw new ArgumentException();
                }
                else
                {
                    this.name = value;
                }
            }
        }

        public void BuyingProduct(Product productToBuy)
        {
            if (productToBuy.Price > this.Money)
            {
                Console.WriteLine($"{this.Name} can't afford {productToBuy.Name}");
            }
            else
            {
                this.bagOfProducts.Add(productToBuy);
                this.money -= productToBuy.Price;
                Console.WriteLine($"{this.name} bought {productToBuy.Name}");
            }
        }

        public override string ToString()
        {
            string toreturn = string.Empty;

            if (this.bagOfProducts.Count > 0)
            {
                toreturn = $"{this.name} - {string.Join(", ", bagOfProducts)}";
            }
            else
            {
                toreturn = $"{this.name} - Nothing bought";
            }
            return toreturn;
        }
    }
}