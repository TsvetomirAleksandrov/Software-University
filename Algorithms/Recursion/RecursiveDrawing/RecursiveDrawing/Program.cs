using System;

namespace RecursiveDrawing
{
    class Program
    {
        static void PrintFigure(int n)
        {
            if (n == 0)
            {
                return;
            }

            //Pre-action: print n asterisks
            Console.WriteLine(new string('*', n));

            //Recursive call: print figure of size n-1
            PrintFigure(n - 1);

            //Post-action: print n hashtags
            Console.WriteLine(new string('#', n));
        }

        static void Main(string[] args)
        {
            PrintFigure(5);
        }
    }
}
