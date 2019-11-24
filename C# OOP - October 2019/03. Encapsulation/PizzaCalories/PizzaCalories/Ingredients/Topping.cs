using System;
using PizzaCalories.IngredientsChecker;

namespace PizzaCalories.Ingredients
{
    public class Topping
    {
        private string type;
        private double weight;

        public Topping(string type, double weight)
        {
            this.Type = type;
            this.Weight = weight;
        }

        private double Weight
        {
            get { return weight; }
            set
            {
                if (value >= 1 && value <= 50)
                {
                    this.weight = value;
                }
                else
                {
                    Console.WriteLine($"{this.type} weight should be in the range [1..50].");
                    throw new ArgumentException();
                }
            }
        }

        private string Type
        {
            get { return type; }
            set
            {
                if (ToppingChecker.Validate(value))
                {
                    this.type = value;
                }
                else
                {
                    Console.WriteLine($"Cannot place {value} on top of your pizza.");
                    throw new ArgumentException();
                }
            }
        }

        public double TotalCalories => (2 * this.Weight)
           * ToppingChecker.GetCalories(this.type);
    }
}

