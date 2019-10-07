using System;
using System.Collections.Generic;

namespace _05._Count_Symbols
{
    class Program
    {
        static void Main(string[] args)
        {
            char[] text = Console.ReadLine().ToCharArray();
            var countChars = new SortedDictionary<char, int>();

            for (int i = 0; i < text.Length; i++)
            {
                if (!countChars.ContainsKey(text[i]))
                {
                    countChars.Add(text[i], 0);
                }

                countChars[text[i]]++;
            }

            foreach (var character in countChars)
            {
                Console.WriteLine($"{character.Key}: {character.Value} time/s");
            }
        }
    }
}
