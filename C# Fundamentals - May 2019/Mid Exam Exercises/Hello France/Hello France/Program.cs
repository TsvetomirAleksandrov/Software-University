using System;
using System.Collections.Generic;
using System.Linq;

namespace P02_HelloFrance
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = Console.ReadLine().Split("|");
            double money = double.Parse(Console.ReadLine());

            var newPrices = new List<double>();
            for (int i = 0; i < input.Length; i++)
            {
                var item = input[i].Split("->");
                string name = item[0];
                double price = double.Parse(item[1]);
                double maxPrice = 0;
                if (name == "Clothes")
                {
                    maxPrice = 50;
                }
                else if (name == "Shoes")
                {
                    maxPrice = 35;
                }
                else if (name == "Accessories")
                {
                    maxPrice = 20.5;
                }
                if (money >= price && price <= maxPrice)
                {
                    money -= price;
                    newPrices.Add(price * 1.4);
                }
            }

            for (int i = 0; i < newPrices.Count; i++)
            {
                Console.Write($"{newPrices[i]:f2} ");
            }
            Console.WriteLine();

            money += newPrices.Sum();
            double profit = newPrices.Sum() - newPrices.Sum() / 1.4;
            Console.WriteLine($"Profit: {profit:f2}");

            if (money >= 150)
            {
                Console.WriteLine("Hello, France!");
            }
            else
            {
                Console.WriteLine("Time to go.");
            }
        }
    }
}