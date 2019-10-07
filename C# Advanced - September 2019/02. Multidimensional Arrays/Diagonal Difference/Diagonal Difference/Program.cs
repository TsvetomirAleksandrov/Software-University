using System;
using System.Linq;

namespace Diagonal_Difference
{
    class Program
    {
        static void Main(string[] args)
        {
            int sizeMatrix = int.Parse(Console.ReadLine());
            int[,] matrix = new int[sizeMatrix, sizeMatrix];

            //read input
            for (int row = 0; row < sizeMatrix; row++)
            {
                var values = Console.ReadLine()
                    .Split()
                    .Select(int.Parse)
                    .ToArray();

                for (int col = 0; col < values.Length; col++)
                {
                    matrix[row, col] = values[col];
                }
            }

            int firstDiagonalSum = 0;

            for (int row = 0; row < sizeMatrix; row++)
            {
                int currentValue = matrix[row, row];
                firstDiagonalSum += currentValue;
            }

            int secondDiagonalSum = 0;
            int currentRow = 0;

            for (int i = sizeMatrix - 1; i >= 0; i--)
            {
                int currentValue = matrix[currentRow, i];
                secondDiagonalSum += currentValue;
                currentRow++;
            }

            int diff = Math.Abs(firstDiagonalSum - secondDiagonalSum);
            Console.WriteLine(diff);
            
        }
    }
}
