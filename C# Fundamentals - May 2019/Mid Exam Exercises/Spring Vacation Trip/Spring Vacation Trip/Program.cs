using System;
using System.Collections.Generic;
using System.Linq;

class Tech_Module
{
    static void Main()
    {
        int days = int.Parse(Console.ReadLine());
        double budget = double.Parse(Console.ReadLine());
        int people = int.Parse(Console.ReadLine());
        double fuelPerKM = double.Parse(Console.ReadLine());
        double food = double.Parse(Console.ReadLine());
        double room = double.Parse(Console.ReadLine());

        if (people > 10)
        {
            room *= 0.75;
        }
        double expenses = days * people * (food + room);

        for (int i = 1; i <= days; i++)
        {
            double travelledDistance = double.Parse(Console.ReadLine());
            expenses += travelledDistance * fuelPerKM;

            if (i % 3 == 0 || i % 5 == 0)
            {
                expenses *= 1.4;
            }
            if (i % 7 == 0)
            {
                expenses -= expenses / people;
            }

            if (expenses > budget)
            {
                Console.WriteLine($"Not enough money to continue the trip. You need {(expenses - budget):f2}$ more.");
                return;
            }
        }
        Console.WriteLine($"You have reached the destination. You have {(budget - expenses):f2}$ budget left.");
    }
}
