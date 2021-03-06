﻿using System;
using System.Linq;
using System.Collections.Generic;

namespace Distance_calculator
{
    class Program
    {
        static void Main(string[] args)
        {
            int steps = int.Parse(Console.ReadLine());
            double stepLength = double.Parse(Console.ReadLine());
            int distance = int.Parse(Console.ReadLine());

            double distanceTravelled = 0;

            for (int i = 1; i <= steps; i++)
            {
                if (i % 5 == 0)
                {
                    distanceTravelled += (stepLength - (stepLength * 0.30));
                }
                else
                {
                    distanceTravelled += stepLength;
                }
            }

            var percentage = (distanceTravelled / distance);
            Console.WriteLine($"You travelled {percentage:f2}% of the distance!");
        }
    }
}
