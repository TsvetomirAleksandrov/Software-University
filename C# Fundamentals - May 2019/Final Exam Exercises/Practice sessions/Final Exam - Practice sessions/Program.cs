using System;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Numerics;
using System.Text;
using System.Globalization;

namespace Final_Exam___Practice_sessions
{
    class Program
    {
        static void Main()
        {
            Dictionary<string, List<string>> roadsAndRacers = new Dictionary<string, List<string>>();
            string input = string.Empty;

            while ((input = Console.ReadLine()) != "END")
            {
                string[] command = input.Split("->").ToArray();

                if (command[0] == "Add")
                {
                    string road = command[1];
                    string racer = command[2];

                    if (!roadsAndRacers.ContainsKey(road))
                    {
                        roadsAndRacers.Add(road, new List<string>());
                        roadsAndRacers[road].Add(racer);
                    }
                    else
                    {
                        roadsAndRacers[road].Add(racer);
                    }      
                }

                else if (command[0] == "Move")
                {
                    string currentRoad = command[1];
                    string racer = command[2];
                    string nextRoad = command[3];

                    if (roadsAndRacers[currentRoad].Contains(racer))
                    {
                        roadsAndRacers[currentRoad].Remove(racer);
                        roadsAndRacers[nextRoad].Add(racer);
                    }
                }

                else if (command[0] == "Close")
                {
                    string road = command[1];

                    if (roadsAndRacers.ContainsKey(road))
                    {
                        roadsAndRacers.Remove(road);
                    }
                }
            }
            Console.WriteLine("Practice sessions:");

            var result = roadsAndRacers.OrderByDescending(x => x.Value.Count).ThenBy(y => y.Key).ToList();
            foreach (var kvp in result)
            {
                Console.WriteLine($"{kvp.Key}");

                for (int i = 0; i < kvp.Value.Count; i++)
                {
                    Console.WriteLine($"++{kvp.Value[i]}");
                }
            }
           
        }
    }
}
