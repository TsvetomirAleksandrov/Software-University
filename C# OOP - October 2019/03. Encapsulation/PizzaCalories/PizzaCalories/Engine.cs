using PizzaCalories.Ingredients;
using System;
using System.Linq;


namespace PizzaCalories
{
    public class Engine
    {
        private Pizza customPizza;

        public Engine()
        {
            customPizza = new Pizza();
        }

        public void Run()
        {
            try
            {
                string[] inputPizza = Console.ReadLine().Split(" ");
                customPizza.Name = inputPizza[1];

                string[] inputDough = Console.ReadLine()
                 .Split(" ", StringSplitOptions.RemoveEmptyEntries).ToArray();

                Dough newDought = new Dough(inputDough[1], inputDough[2], double.Parse(inputDough[3]));
                customPizza.Dough = newDought;

                string toppingInput = string.Empty;
                while ((toppingInput = Console.ReadLine()) != "END")
                {
                    string[] toppingInputArr = toppingInput
                        .Split(" ", StringSplitOptions.RemoveEmptyEntries).ToArray();

                    Topping newTopping = new Topping(toppingInputArr[1], double.Parse(toppingInputArr[2]));
                    customPizza.AddTopping(newTopping);
                }

                Printing();
            }
            catch (Exception)
            {
            }
        }

        private void Printing()
        {
            Console.WriteLine($"{customPizza.Name} - {customPizza.TotalCalories:f2} Calories.");
        }
    }
}