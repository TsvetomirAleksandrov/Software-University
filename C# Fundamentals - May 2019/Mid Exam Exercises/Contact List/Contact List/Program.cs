using System;
using System.Collections.Generic;
using System.Linq;

namespace _03._Problem
{
    class Program
    {
        static void Main(string[] args)
        {

            var list = Console.ReadLine()
                .Split(' ')
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .ToList();
            var print = new List<string>();

            string input;

            while (!(input = Console.ReadLine()).Contains("Print"))
            {
                string command = input.Split(" ")[0];

                if (command == "Add")
                {
                    string contact = input.Split(" ")[1];
                    int index = int.Parse(input.Split(" ")[2]);

                    if (!list.Contains(contact))
                    {
                        list.Add(contact);
                    }
                    else if (index >= 0 && index < list.Count)
                    {
                        list.Insert(index, contact);
                    }

                }
                else if (command == "Remove")
                {
                    int index = int.Parse(input.Split(" ")[1]);

                    if (index >= 0 && index < list.Count)
                    {
                        list.RemoveAt(index);
                    }
                }
                else if (command == "Export")
                {
                    int startIndex = int.Parse(input.Split(" ")[1]);
                    int count = int.Parse(input.Split(" ")[2]);

                    if (startIndex >= 0 && startIndex < list.Count() && count > 0)
                    {
                        if (count >= list.Count || count <= 0)
                        {
                            count = list.Count;
                        }
                        print = list.Skip(startIndex).Take(count).Select(x => x).ToList();
                        //for (int i = startIndex; i < count; i++)
                        //{
                        //print.Add(list[i]);
                        //}
                        Console.WriteLine(string.Join(" ", print));
                        print.Clear();
                    }
                }

            }
            if (input.Split(" ")[1] == "Reversed")
            {
                list.Reverse();
            }
            Console.WriteLine($"Contacts: {string.Join(" ", list)}");
        }
    }
}