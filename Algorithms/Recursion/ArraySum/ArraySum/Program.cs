using System;

namespace ArraySum
{
    class Program
    {
       static int Sum(int[] array, int index)
        {
            if (index == array.Length - 1)
            {
                return array[index];
            }

            return array[index] + Sum(array, index + 1);
        }

        static void Main(string[] args)
        {
            var numbers = new[] { 1, 2, 3, 4, 5 };

            var sum = Sum(numbers, 0);

            Console.WriteLine(sum);
        }
    }
}
