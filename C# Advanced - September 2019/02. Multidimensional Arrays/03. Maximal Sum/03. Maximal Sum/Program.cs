using System;
using System.Linq;

namespace _02._Squares_in_Matrix
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] dimensions = Console.ReadLine().Split(" ", StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToArray();

            int totalRows = dimensions[0];
            int totalCols = dimensions[1];

            int[,] matrix = new int[totalRows, totalCols];

            InitializeMatrix(matrix);

            int maxNumber = int.MinValue;
            int targetRow = 0;
            int targetCol = 0;

            for (int row = 0; row < matrix.GetLength(0) -2; row++)
            {
                for (int col = 0; col < matrix.GetLength(1) -2; col++)
                {
                    int currentSum = matrix[row, col] + matrix[row, col + 1]
                        + matrix[row, col + 2]
                        + matrix[row + 1, col] + matrix[row + 1, col + 1]
                        + matrix[row + 1, col + 2] + matrix[row + 2, col]
                        + matrix[row + 2, col + 1] + matrix[row + 2, col + 2];

                    if (currentSum > maxNumber)
                    {
                        maxNumber = currentSum;
                        targetRow = row;
                        targetCol = col;
                    }
                }
            }

            Console.WriteLine($"Sum = {maxNumber}");

            for (int row = targetRow; row <= targetRow + 2; row++)
            {
                for (int col = targetCol; col <= targetCol + 2; col++)
                {
                    Console.Write(matrix[row, col] + " ");
                }
                Console.WriteLine();
            }
          
        }

        private static void InitializeMatrix(int[,] matrix)
        {
            for (int row = 0; row < matrix.GetLength(0); row++)
            {
                int[] input = Console.ReadLine()
                    .Split(" ", StringSplitOptions.RemoveEmptyEntries)
                    .Select(int.Parse)
                    .ToArray();

                for (int col = 0; col < matrix.GetLength(1); col++)
                {
                    matrix[row, col] = input[col];
                }
            }
        }
    }
}
