using System;
using System.Linq;
using System.Collections.Generic;

namespace _07_Tuple
{
    class StartUp
    {
        static void Main(string[] args)
        {
            string[] inputPersonInfo = Console.ReadLine()
                .Split(' ', StringSplitOptions.RemoveEmptyEntries);

            string[] inputPersonBeer = Console.ReadLine()
                .Split();

            string[] inputNumbersInfo = Console.ReadLine()
                .Split();

            string fullName = inputPersonInfo[0] + " " + inputPersonInfo[1];
            string address = inputPersonInfo[2];

            string name = inputPersonBeer[0];
            int liters = int.Parse(inputPersonBeer[1]);

            int myInt = int.Parse(inputNumbersInfo[0]);
            double myDouble = double.Parse(inputNumbersInfo[1]);

            MyTuple<string, string> personIfo = new MyTuple<string, string>(fullName, address);
            var personBeer = new MyTuple<string, int>(name, liters);
            var numbersInfo = new MyTuple<int, double>(myInt, myDouble);

            Console.WriteLine(personIfo);
            Console.WriteLine(personBeer);
            Console.WriteLine(numbersInfo); 
        }
    }
}
