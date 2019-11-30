namespace SoftUniRestaurant.Models.Foods
{
    using System;
    using Contracts;
    public abstract class Food : IFood
    {
        private string name;
        private int servingSize;
        private decimal price;

        public Food(string name, int servingSize, decimal price)
        {
            this.Name = name;
            this.ServingSize = servingSize;
            this.Price = price;
        }

        public decimal Price
        {
            get
            {
                return price;
            }
            private set
            {
                if (value <= 0)
                {
                    throw new ArgumentException("Price cannot be less or equal to zero");
                }
                price = value;
            }
        }
        public int ServingSize
        {
            get
            {
                return servingSize;
            }
            private set
            {
                if (value <= 0)
                {
                    throw new ArgumentException("Serving size cannot be less or equal to zero");
                }
                servingSize = value;
            }
        }
        public string Name
        {
            get
            {
                return name;
            }
            private set
            {
                if (String.IsNullOrWhiteSpace(value))
                {
                    throw new ArgumentException("Name cannot be null or white space!");
                }
                name = value;
            }
        }


        public override string ToString()
        {
            return $"{name}: {servingSize}g - {price:f2}";
        }
    }
}
