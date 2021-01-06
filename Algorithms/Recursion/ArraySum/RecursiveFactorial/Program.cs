using System;

namespace RecursiveFactorial
{
    class Program
    {
        static long Factorial(int num)
        {
            if (num == 0)
            {
                return 1;
            }

            return num * Factorial(num - 1);
        }

        static void Main(string[] args)
        {
            var fact = Factorial(5);

            Console.WriteLine(fact);
        }
    }
}
