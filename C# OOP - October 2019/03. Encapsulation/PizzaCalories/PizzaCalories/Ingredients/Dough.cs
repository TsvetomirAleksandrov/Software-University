using PizzaCalories.IngredientsChecker;
using System;

namespace PizzaCalories.Ingredients
{
    public class Dough
    {
        private string flour;
        private string bakingTechnique;
        private double weight;

        public Dough(string flour, string technique, double weight)
        {
            this.Flour = flour;
            this.BakingTechnique = technique;
            this.Weight = weight;
        }

        private double Weight
        {
            get { return this.weight; }
            set
            {
                if (value >= 1 && value <= 200)
                {
                    this.weight = value;
                }
                else
                {
                    Console.WriteLine("Dough weight should be in the range [1..200].");
                    throw new ArgumentException();
                }
            }
        }


        private string BakingTechnique
        {
            get { return bakingTechnique; }
            set
            {
                if (TechniqueChecker.Validate(value))
                {
                    this.bakingTechnique = value;
                }
                else
                {
                    Console.WriteLine("Invalid type of dough.");
                    throw new ArgumentException();
                }
            }
        }

        private string Flour
        {
            get { return flour; }
            set
            {
                if (FlourTypeChecker.Validate(value))
                {
                    this.flour = value;
                }
                else
                {
                    Console.WriteLine("Invalid type of dough.");
                    throw new ArgumentException();
                }
            }
        }

        public double TotalCalories => (2 * this.Weight)
             * TechniqueChecker.GetCalories(this.BakingTechnique)
             * FlourTypeChecker.GetCalories(this.Flour);
    }
}