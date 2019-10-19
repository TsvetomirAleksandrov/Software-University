﻿using System;
using System.Linq;
using System.Collections.Generic;

namespace _01_Generic_Box_of_String
{
    public class StartUp
    {
        public static void Main(string[] args)
        {
            int counter = int.Parse(Console.ReadLine());

            Box<int> box = new Box<int>();

            for (int i = 0; i < counter; i++)
            {
                int input = int.Parse(Console.ReadLine());
                box.Values.Add(input);
            }

            int[] indexes = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();

            int a = indexes[0];
            int b = indexes[1];

            box.Swap(a, b);

            Console.WriteLine(box);
        }
    }
}
 