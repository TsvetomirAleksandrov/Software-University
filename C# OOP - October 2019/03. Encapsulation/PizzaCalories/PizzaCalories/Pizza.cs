using System;
using System.Collections.Generic;
using PizzaCalories.Ingredients;

namespace PizzaCalories
{
    public class Pizza
    {
        private string name;
        private List<Topping> toppings;

        public Pizza()
        {
            this.toppings = new List<Topping>();
        }

        public Dough Dough { private get; set; }

        public string Name
        {
            get { return this.name; }
            set
            {
                if (!string.IsNullOrWhiteSpace(value) && value.Length <= 15)
                {
                    this.name = value;
                }
                else
                {
                    Console.WriteLine("Pizza name should be between 1 and 15 symbols.");
                    throw new ArgumentException();
                }
            }
        }

        public int NumberOfToppings => toppings.Count;
        public double TotalCalories => CalculateTotalCalories();

        public void AddTopping(Topping toAdd)
        {
            if (NumberOfToppings == 10)
            {
                Console.WriteLine("Number of toppings should be in range [0..10].");
                throw new ArgumentException();
            }

            toppings.Add(toAdd);
        }

        private double CalculateTotalCalories()
        {
            double totalDoughCalories = this.Dough.TotalCalories;
            double totalToppingCalories = 0;

            for (int i = 0; i < toppings.Count; i++)
            {
                totalToppingCalories += toppings[i].TotalCalories;
            }

            return totalDoughCalories + totalToppingCalories;
        }
    }
}