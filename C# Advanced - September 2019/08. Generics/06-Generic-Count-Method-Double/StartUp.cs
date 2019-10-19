using System;
using System.Linq;
using System.Collections.Generic;

namespace _01_Generic_Box_of_String
{
    public class StartUp
    {
        public static void Main(string[] args)
        {
            int counter = int.Parse(Console.ReadLine());

            Box<double> box = new Box<double>();

            for (int i = 0; i < counter; i++)
            {
                double input = double.Parse(Console.ReadLine());
                box.Values.Add(input);
            }

            double targetItem = double.Parse(Console.ReadLine());

            int result = box.GreaterValuesThan(targetItem);

            Console.WriteLine(result);
        }
    }
}
 