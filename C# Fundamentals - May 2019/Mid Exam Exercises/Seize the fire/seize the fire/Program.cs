using System;
using System.Linq;
using System.Collections.Generic;

namespace seize_the_fire
{
    class Program
    {
        static void Main(string[] args)
        {
            var list = Console.ReadLine().Split("#").ToList();
            int water = int.Parse(Console.ReadLine());
            double effort = 0;
            int totalFire = 0;
            var cells = new List<int>();

            for (int i = 0; i < list.Count; i++)
            {
                string typeOfFire = list[i].Split(" = ")[0];
                int cell = int.Parse(list[i].Split(" = ")[1]);

                if (typeOfFire == "High" && cell >= 81 && cell <= 125 && water >= cell)
                {
                    cells.Add(cell);
                    effort += cell * 0.25;
                    water -= cell;
                    totalFire += cell;
                }
                if (typeOfFire == "Medium" && cell >= 51 && cell <= 80 && water >= cell)
                {
                    cells.Add(cell);
                    effort += cell * 0.25;
                    water -= cell;
                    totalFire += cell;
                }
                if (typeOfFire == "Low" && cell >= 1 && cell <= 50 && water >= cell)
                {
                    cells.Add(cell);
                    effort += cell * 0.25;
                    water -= cell;
                    totalFire += cell;
                }

            }
            Console.WriteLine("Cells:");
            foreach (var cell in cells)
            {
                Console.WriteLine($"- {cell}");
            }
            Console.WriteLine($"Effort: {effort:f2}");
            Console.WriteLine($"Total Fire: {totalFire}");

        }
    }
}
