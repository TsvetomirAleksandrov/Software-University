using System;
using System.IO;

namespace _02._Line_Numbers
{
    class Program
    {
        static void Main(string[] args)
        {
            string filePath = Path.Combine("Resources", "text.txt");

            string[] input = File.ReadAllLines(filePath);

            for (int i = 0; i < input.Length; i++)
            {
                int countLetters = 0;
                int countPunct = 0;

                for (int t = 0; t < input[i].Length; t++)
                {
                    if (char.IsLetter(input[i][t]))
                    {
                        countLetters++;
                    }
                    else if (input[i][t] != ' ')
                    {
                         countPunct++;
                    }
                }

                input[i] = $"Line{i + 1}: {input[i]} ({countLetters})({countPunct})";
            }

            File.WriteAllLines("output.txt", input);
        }
    }
}
