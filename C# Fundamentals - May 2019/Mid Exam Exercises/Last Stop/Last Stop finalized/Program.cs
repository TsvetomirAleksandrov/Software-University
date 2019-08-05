using System;
using System.Collections.Generic;
using System.Linq;

namespace Last_Stop_finalized
{
    class Program
    {
        static void Main(string[] args)
        {
            List<int> numbers = Console.ReadLine().Split(" ").Select(int.Parse).ToList();

            string command = " ";

            while ((command = Console.ReadLine()) != "END")
            {
                string[] tokens = command.Split(" ").ToArray();

                if (tokens[0] == "Change")
                {
                    int painting = int.Parse(tokens[1]);
                    int changed = int.Parse(tokens[2]);
                    if (numbers.Contains(painting))
                    {
                        int index1 = numbers.IndexOf(painting);
                        numbers[index1] = changed;
                    }
                }
                if (tokens[0] == "Hide")
                {
                    int painting = int.Parse(tokens[1]);
                    if (numbers.Contains(painting))
                    {
                        numbers.Remove(painting);
                    }
                }
                if (tokens[0] == "Switch")
                {
                    int painting = int.Parse(tokens[1]);
                    int painting2 = int.Parse(tokens[2]);
                    if (numbers.Contains(painting) && numbers.Contains(painting2))
                    {
                        int index1 = numbers.IndexOf(painting);
                        int index2 = numbers.IndexOf(painting2);
                        numbers[index1] = painting2;
                        numbers[index2] = painting;
                    }
                }
                if (tokens[0] == "Insert")
                {
                    int index = int.Parse(tokens[1]) + 1;
                    int painting = int.Parse(tokens[2]);
                    if (index > 0 && index < numbers.Count)
                    {
                        numbers.Insert(index, painting);
                    }
                }
                if (tokens[0] == "Reverse")
                {
                    numbers.Reverse();
                }
            }
            Console.WriteLine(string.Join(" ", numbers));
        }
    }
}
