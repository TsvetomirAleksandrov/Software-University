using System;
using System.Collections.Generic;
using System.Text;

namespace ShoppingSpree
{
    public class Product
    {
        private string name;
        private decimal price;

        public Product(decimal price, string name)
        {
            this.Name = name;
            this.Price = price;
        }

        public decimal Price
        {
            get { return this.price; }
            set
            {
                if (value < 0)
                {
                    Console.WriteLine("Money cannot be negative");
                    throw new ArgumentException();
                }
                this.price = value;
            }
        }

        public string Name
        {
            get { return this.name; }
            set
            {
                if (value == "")
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

        public override string ToString()
        {
            return this.name;
        }
    }
}