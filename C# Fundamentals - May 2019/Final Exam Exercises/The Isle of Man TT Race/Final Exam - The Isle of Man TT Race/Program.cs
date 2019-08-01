using System;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Numerics;
using System.Text;
using System.Globalization;

namespace Final_Exam___The_Isle_of_Man_TT_Race
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                string input = Console.ReadLine();

                string lengthPattern = @"=(\d+)!!";

                Match m = Regex.Match(input, lengthPattern);

                
                if (m.Success)
                {
                    int length = int.Parse(m.Groups[1].Value);
                    string pattern = $@"([#$%*&])(\w+)\1=(\d+)!!(.{{{length}}})$";

                    Match match = Regex.Match(input, pattern);

                    if (match.Success)
                    {
                        string name = match.Groups[2].Value;
                        string coordinates = match.Groups[4].Value;

                        StringBuilder sb = new StringBuilder();

                        for (int i = 0; i < coordinates.Length; i++)
                        {
                            sb.Append((char)(coordinates[i] + length));
                        }

                        Console.WriteLine($"Coordinates found! {name} -> {sb.ToString()}");
                        break;
                    }
                }

                Console.WriteLine("Nothing found!");

            }
        }
    }
}
