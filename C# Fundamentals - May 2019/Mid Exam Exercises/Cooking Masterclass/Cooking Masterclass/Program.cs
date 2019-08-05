using System;

namespace _01._Cooking_Masterclass
{
    class Program
    {
        static void Main(string[] args)
        {
            double budget = double.Parse(Console.ReadLine());
            int students = int.Parse(Console.ReadLine());
            double flourPrice = double.Parse(Console.ReadLine());
            double eggPrice = double.Parse(Console.ReadLine());
            double apronPrice = double.Parse(Console.ReadLine());
            int freePackages = students / 5;
            double neededItems = apronPrice * Math.Ceiling(students * 1.2) + eggPrice * 10 * (students) + flourPrice * (students - freePackages);
            if (neededItems <= budget)
            {
                Console.WriteLine($"Items purchased for {neededItems:F2}$.");
            }
            else
            {
                double neededMoney = neededItems - budget;
                Console.WriteLine($"{neededMoney:F2}$ more needed.");
            }

        }
    }
}