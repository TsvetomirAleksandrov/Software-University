using System;

namespace _08_KnightGame
{
    class Program
    {
        static void Main()
        {
            int n = int.Parse(Console.ReadLine());
            char[,] board = new char[n, n];
            for (int i = 0; i < n; i++)
            {
                string line = Console.ReadLine();
                for (int j = 0; j < n; j++)
                {
                    board[i, j] = line[j];
                }
            }

            int knightsRemoved = 0;

            bool possibleMoves = true;
            while (possibleMoves)
            {
                knightsRemoved += KnightRemover(board);
                possibleMoves = CheckForMoves(board);
            }
            Console.WriteLine(knightsRemoved);
        }

        static bool CheckForMoves(char[,] board)
        {
            for (int row = 0; row < board.GetLength(0); row++)
            {
                for (int col = 0; col < board.GetLength(1); col++)
                {
                    if (board[row, col] == 'K')
                    {
                        if (row - 2 >= 0)
                        {
                            if (col - 1 >= 0)
                            {
                                if (board[row - 2, col - 1] == 'K') return true;
                            }
                            if (col + 1 < board.GetLength(1))
                            {
                                if (board[row - 2, col + 1] == 'K') return true;
                            }
                        }
                        if (row - 1 >= 0)
                        {
                            if (col - 2 >= 0)
                            {
                                if (board[row - 1, col - 2] == 'K') return true;
                            }
                            if (col + 2 < board.GetLength(1))
                            {
                                if (board[row - 1, col + 2] == 'K') return true;
                            }
                        }
                        if (row + 1 < board.GetLength(0))
                        {
                            if (col - 2 >= 0)
                            {
                                if (board[row + 1, col - 2] == 'K') return true;
                            }
                            if (col + 2 < board.GetLength(1))
                            {
                                if (board[row + 1, col + 2] == 'K') return true;
                            }
                        }
                        if (row + 2 < board.GetLength(0))
                        {
                            if (col - 1 >= 0)
                            {
                                if (board[row + 2, col - 1] == 'K') return true;
                            }
                            if (col + 1 < board.GetLength(1))
                            {
                                if (board[row + 2, col + 1] == 'K') return true;
                            }
                        }
                    }
                }
            }

            return false;
        }
        static int KnightRemover(char[,] board)
        {
            //find maxKnight
            int maxKnightRow = 0;
            int maxKnightCol = 0;
            int maxKnightStepCount = 0;

            for (int row = 0; row < board.GetLength(0); row++)
            {
                for (int col = 0; col < board.GetLength(1); col++)
                {
                    int currentKnightCount = 0;
                    if (board[row, col] == 'K')
                    {
                        if (row - 2 >= 0)
                        {
                            if (col - 1 >= 0)
                            {
                                if (board[row - 2, col - 1] == 'K') currentKnightCount++;
                            }
                            if (col + 1 < board.GetLength(1))
                            {
                                if (board[row - 2, col + 1] == 'K') currentKnightCount++;
                            }
                        }
                        if (row - 1 >= 0)
                        {
                            if (col - 2 >= 0)
                            {
                                if (board[row - 1, col - 2] == 'K') currentKnightCount++;
                            }
                            if (col + 2 < board.GetLength(1))
                            {
                                if (board[row - 1, col + 2] == 'K') currentKnightCount++;
                            }
                        }
                        if (row + 1 < board.GetLength(0))
                        {
                            if (col - 2 >= 0)
                            {
                                if (board[row + 1, col - 2] == 'K') currentKnightCount++;
                            }
                            if (col + 2 < board.GetLength(1))
                            {
                                if (board[row + 1, col + 2] == 'K') currentKnightCount++;
                            }
                        }
                        if (row + 2 < board.GetLength(0))
                        {
                            if (col - 1 >= 0)
                            {
                                if (board[row + 2, col - 1] == 'K') currentKnightCount++;
                            }
                            if (col + 1 < board.GetLength(1))
                            {
                                if (board[row + 2, col + 1] == 'K') currentKnightCount++;
                            }
                        }
                    }
                    if (currentKnightCount > maxKnightStepCount)
                    {
                        maxKnightStepCount = currentKnightCount;
                        maxKnightRow = row;
                        maxKnightCol = col;
                    }
                }
            }

            //remove max Knight
            if (maxKnightStepCount > 0)
            {
                board[maxKnightRow, maxKnightCol] = '0';
                return 1;
            }
            else
            {
                return 0;
            }
        }
    }
}