using System;
using System.Collections.Generic;
using System.Linq;

namespace Problem_1._Party_Profit
{
    class Program
    {
        static void Main(string[] args)
        {
            var companions = int.Parse(Console.ReadLine());
            var days = int.Parse(Console.ReadLine());

            int coins = days*50;

            for (int day = 1; day <= days; day++)
            {
                coins -= (companions * 2);

                if (day % 10 == 0)
                {
                    companions -= 2;
                }
                if (day % 15 == 0)
                {
                    companions += 5;
                }
                if (day % 3 == 0)
                {
                    coins -= (companions * 3);
                }
                if (day % 5 == 0)
                {
                    coins += (companions * 20);
                    if (day % 3 == 0)
                    {
                        coins -= (companions * 2);
                    }         
                }
              
            }

            var coinsPerPerson = coins / companions;
            Console.WriteLine($"{companions} companions received {coinsPerPerson} coins each.");
        }
    }
}
