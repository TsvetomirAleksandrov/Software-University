using System;
using System.IO;

namespace _04._Copy_Binary_File
{
    class Program
    {
        static void Main(string[] args)
        {
            string filePath = Path.Combine("Resources", "input.jpg");

            using (var input = new FileStream(filePath, FileMode.Open))
            {
                byte[] buffer = new byte[4];

                using (var output = new FileStream("output.jpg", FileMode.Create))
                {
                    while (output.Length != input.Length)
                    {
                        int readedBytes = input.Read(buffer, 0, buffer.Length);
                        output.Write(buffer, 0, readedBytes);
                    }
                }
            }
        }
    }
}
