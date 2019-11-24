using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Person
{
    class Program
    {
        static void Main(string[] args)
        {
            string name = Console.ReadLine();

            var age = int.Parse(Console.ReadLine());

            Child child = new Child(name, age);
            Console.WriteLine(child);
        }
    }
}
