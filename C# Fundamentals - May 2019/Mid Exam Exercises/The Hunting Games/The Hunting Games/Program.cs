using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace asd
{
    class Program
    {
        static void Main(string[] args)
        {


            int days = int.Parse(Console.ReadLine());
            int players = int.Parse(Console.ReadLine());
            double energy = double.Parse(Console.ReadLine());
            double water = days * players * double.Parse(Console.ReadLine());
            double food = days * players * double.Parse(Console.ReadLine());

            for (int i = 1; i <= days; i++)
            {
                energy -= double.Parse(Console.ReadLine());
                if (energy <= 0)
                {
                    break;
                }
                if (i % 2 == 0)
                {
                    // water *= 0.7;
                    water = water - (water * 0.3);
                    // energy *= 1.05;
                    energy = energy + (energy * 0.05);
                }
                if (i % 3 == 0)
                {
                    food -= food / players;
                    //energy *= 1.1;
                    energy = energy + (energy * 0.1);
                }
            }

            if (energy > 0)
            {
                Console.WriteLine($"You are ready for the quest. You will be left with - {energy:f2} energy!");
            }
            else
            {
                Console.WriteLine($"You will run out of energy. You will be left with {food:f2} food and {water:f2} water.");
            }
        }
    }
}
