using System;
using System.Linq;
using System.Collections.Generic;

namespace froggy
{
    class Program
    {
        static void Main(string[] args)
        {
            var frogNames = Console.ReadLine().Split(" ").ToList();
            var print = new List<string>();
            var input = string.Empty;
            
            while (!(input = Console.ReadLine()).Contains("Print"))
            {
                var tokens = input.Split(" ").ToArray();
                var command = tokens[0];


                if (command == "Join")
                {
                    string name = tokens[1];
                    if (!frogNames.Contains(name))
                    {
                        frogNames.Add(name);
                    }
                }

                else if (command == "Jump")
                {
                    string name = tokens[1];
                    int index = int.Parse(tokens[2]);

                    if (index >= 0 && index < frogNames.Count)
                    {
                        frogNames.Insert(index, name);
                    }
                }

                else if (command == "Dive")
                {
                    int index = int.Parse(tokens[1]);

                    if (index >= 0 && index < frogNames.Count)
                    {
                        frogNames.RemoveAt(index);
                    }
                }

                else if (command == "First")
                {
                    int count = int.Parse(tokens[1]);

                    if (count >= frogNames.Count)
                    {
                        count = frogNames.Count;
                    }
                    print = frogNames.Take(count).Select(x => x).ToList();
                    Console.WriteLine(string.Join(" ", print));
                }

                else if (command == "Last")
                {
                    int count = int.Parse(tokens[1]);

                    if (count >= frogNames.Count)
                    {
                        count = frogNames.Count;
                    }
                    frogNames.Reverse();
                    print = frogNames.Take(count).Select(x => x).ToList();
                    print.Reverse();
                    frogNames.Reverse();
                    Console.WriteLine(string.Join(" ", print));
                }    
            }
            if (input.Split(" ")[1] == "Reversed")
            {
                frogNames.Reverse();
            }
            Console.WriteLine($"Frogs: {string.Join(" ", frogNames)}");
        }
    }
}
