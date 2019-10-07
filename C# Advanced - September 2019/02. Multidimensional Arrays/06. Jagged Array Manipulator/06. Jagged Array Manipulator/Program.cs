using System;
using System.Linq;

namespace _06._Jagged_Array_Manipulator
{
    class Program
    {
        static void Main(string[] args)
        {
            int rows = int.Parse(Console.ReadLine());

            double[][] jaggedArray = new double[rows][];

            for (int row = 0; row < rows; row++)
            {
               jaggedArray[row] = Console.ReadLine()
                 .Split()
                  .Select(double.Parse)
                  .ToArray();   
            }

            Analyze(jaggedArray);

            string command = Console.ReadLine();

            while (command != "End")
            {
                string[] commandInfo = command.Split();
                int targetRow = int.Parse(commandInfo[1]);
                int targetCol = int.Parse(commandInfo[2]);
                int value = int.Parse(commandInfo[3]);

                if (!IsInside(jaggedArray, targetRow, targetCol))
                {
                    command = Console.ReadLine();
                    continue;
                }

                if (commandInfo[0] == "Add")
                {
                    jaggedArray[targetRow][targetCol] += value;
                }
                else
                {
                    jaggedArray[targetRow][targetCol] -= value;
                }


                command = Console.ReadLine();
            }

            foreach (var row in jaggedArray)
            {
                Console.WriteLine(string.Join(" ", row));
            }

        }

        private static bool IsInside(double[][] jaggedArray, int targetRow, int targetCol)
        {
            return targetRow >= 0 && targetRow < jaggedArray.Length && targetCol >= 0 && targetCol < jaggedArray[targetRow].Length;

        }

        private static void Analyze(double[][] jaggedArray)
        {
            for (int row = 0; row < jaggedArray.Length - 1; row++)
            {
                if (jaggedArray[row].Length == jaggedArray[row + 1].Length)
                {
                    for (int col = 0; col < jaggedArray[row].Length; col++)
                    {
                        jaggedArray[row][col] *= 2;
                        jaggedArray[row + 1][col] *= 2;
                    }
                }
                else
                {
                    for (int col = 0; col < jaggedArray[row].Length; col++)
                    {
                        jaggedArray[row][col] /= 2;

                    }
                    for (int col = 0; col < jaggedArray[row+1].Length; col++)
                    {
                        jaggedArray[row + 1][col] /= 2;
                    }
                }
            }
        }
    }
}
