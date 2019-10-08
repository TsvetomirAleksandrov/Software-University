using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace _01._Even_Lines
{
    class Program
    {
        static void Main(string[] args)
        {
            string filePath = Path.Combine("Resources", "text.txt");
            int count = 0;
            List<string> inputLines = new List<string>();

            using (var reader = new StreamReader(filePath))
            {
                string readLine = string.Empty;

                while ((readLine = reader.ReadLine()) != null)
                {
                    if (count % 2 == 0)
                    {
                        inputLines.Add(readLine);
                    }
                    count++;
                }
            }

            for (int i = 0; i < inputLines.Count; i++)
            {
                string[] line = inputLines[i].Split(" ").ToArray();

                for (int t = line.Length - 1; t >= 0; t--)
                {
                    line[t] = line[t].Replace('-', '@');
                    line[t] = line[t].Replace(',', '@');
                    line[t] = line[t].Replace('.', '@');
                    line[t] = line[t].Replace('!', '@');
                    line[t] = line[t].Replace('?', '@');

                    Console.Write(line[t] + " ");
                }
                Console.WriteLine();
            }

        }
    }
}
