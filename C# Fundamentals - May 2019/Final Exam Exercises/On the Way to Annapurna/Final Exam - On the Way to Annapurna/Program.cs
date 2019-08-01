using System;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Numerics;
using System.Text;
using System.Globalization;

namespace Final_Exam___On_the_Way_to_Annapurna
{
    class Program
    {
        static void Main(string[] args)
        {
            Dictionary<string, List<string>> dictionary = new Dictionary<string, List<string>>();
            string input = string.Empty;

            while ((input = Console.ReadLine()) != "END")
            {
                string[] command = input.Split("->");

                if (command[0] == "Add")
                {
                    string store = command[1];
                    string item = command[2];
                    string[] items = item.Split(",").ToArray();

                    if (!dictionary.ContainsKey(store))
                    {
                        dictionary.Add(store, new List<string>());
                    }

                    for (int i = 0; i < items.Length; i++)
                    {
                        string currentItem = items[i];
                        dictionary[store].Add(currentItem);
                    }
                }

                else if (command[0] == "Remove")
                {
                    string store = command[1];

                    if (dictionary.ContainsKey(store))
                    {
                        dictionary.Remove(store);
                    }
                }

                Console.WriteLine("Stores list:");

                foreach (var kvp in dictionary.OrderByDescending(x=>x.Value.Count).ThenByDescending(y=>y.Key))
                {
                    string store = kvp.Key;
                    Console.WriteLine(store);

                    foreach (var item in kvp.Value)
                    {
                        Console.WriteLine($"<<{item}>>");
                    }

                }
            }
        }
    }
}
