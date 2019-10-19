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

            string[] inputBankInfo = Console.ReadLine()
                .Split();

            string fullName = inputPersonInfo[0] + " " + inputPersonInfo[1];
            string address = inputPersonInfo[2];
            string town = string.Join(" ", inputPersonInfo.Skip(3));

            string name = inputPersonBeer[0];
            int liters = int.Parse(inputPersonBeer[1]);
            string type = inputPersonBeer[2];
            bool isDrunk = false;

            if (type == "drunk")
            {
                isDrunk = true;
            }

            string personName = inputBankInfo[0];          
            double balance = double.Parse(inputBankInfo[1]);
            string bankName = inputBankInfo[2];

            var personInfo = new Threeuple<string, string, string>(fullName, address, town);

            var beerInfo = new Threeuple<string, int, bool>(name, liters, isDrunk);

            var bankInfo = new Threeuple<string, double, string>(personName, balance, bankName);

            Console.WriteLine(personInfo);
            Console.WriteLine(beerInfo);
            Console.WriteLine(bankInfo);
        }
    }
}
