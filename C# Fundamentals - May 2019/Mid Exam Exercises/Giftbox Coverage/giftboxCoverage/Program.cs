using System;
using System.Collections.Generic;
using System.Linq;

namespace giftboxCoverage
{
    class Program
    {
        static void Main(string[] args)
        {
            var sizeOfaSide = double.Parse(Console.ReadLine());
            int sheets = int.Parse(Console.ReadLine());
            var singleSheetCovers = double.Parse(Console.ReadLine());

            var area = sizeOfaSide * sizeOfaSide * 6;
            var numOfSheets = sheets;
            double coveredArea = 0;

            for (int i = 1; i <= numOfSheets; i++)
            {
                if (i % 3 == 0)
                {
                    coveredArea += singleSheetCovers * 0.25;
                    sheets -= 1;
                }
                else
                {
                    coveredArea += singleSheetCovers;
                    sheets -= 1;
                }
            }

            double percentage = (coveredArea / area) * 100;
            Console.WriteLine($"You can cover {percentage:f2}% of the box.");
        }
    }
}