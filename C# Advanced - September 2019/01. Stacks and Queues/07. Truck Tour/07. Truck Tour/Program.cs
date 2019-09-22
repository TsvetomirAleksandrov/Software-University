using System;
using System.Collections.Generic;
using System.Linq;

namespace _07._Truck_Tour
{
    class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            List<string[]> queuePetrolPumps = new List<string[]>();
            bool exit = false;
            int counter = 0;

            for (int i = 0; i < n; i++)
            {
                string[] input = Console.ReadLine().Split(" ");
                queuePetrolPumps.Add(input); 
            }

            while(true)
            {
                Queue<string[]> queueCurrentPetrolPump = new Queue<string[]>(queuePetrolPumps);
                int totalPetrol = 0;

                for (int i = 0; i < n; i++)
                {
                    string[] currentNestedPetrolPump = queueCurrentPetrolPump.Peek();
                    int currentPetrol = int.Parse(currentNestedPetrolPump[0]);
                    int currentDistance = int.Parse(currentNestedPetrolPump[1]);
                    totalPetrol += currentPetrol;

                    if (totalPetrol - currentDistance >= 0)
                    {
                        queueCurrentPetrolPump.Dequeue();
                        totalPetrol -= currentDistance;
                    }
                    else
                    {
                        string[] removeItem = queuePetrolPumps[0];
                        queuePetrolPumps.RemoveAt(0);
                        queuePetrolPumps.Add(removeItem);
                        counter++;
                        break;
                    }

                    if (i == n - 1)
                    {
                        exit = true;
                    }
                }

                if (exit == true)
                {
                    Console.WriteLine(counter);
                    break;
                }
            }
        }
    }
}
