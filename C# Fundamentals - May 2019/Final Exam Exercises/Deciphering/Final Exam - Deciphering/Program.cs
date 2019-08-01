using System;
using System.Text.RegularExpressions;

namespace Final_Exam___Deciphering
{
    class Program
    {
        static void Main(string[] args)
        {
            string input = Console.ReadLine();
            var replaceString = Console.ReadLine().Split(" ", StringSplitOptions.RemoveEmptyEntries);
            Regex regex = new Regex(@"[d-z#|{}]+");
            string result = string.Empty;
            var match = regex.Match(input);

            if (input.Length != match.Length)
            {
                Console.WriteLine("This is not the book you are looking for.");
            }

            for (int i = 0; i < input.Length; i++)
            {
                result += ((char)(input[i] - 3));
            }

            while (result.Contains(replaceString[0]))
            {
                result = result.Replace(replaceString[0], replaceString[1]);
            }
            Console.WriteLine(result);
        }
    }
}
