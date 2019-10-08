using System;
using System.IO;
using System.IO.Compression;
using System.Text;

namespace Zip_and_Extract
{
    class Program
    {
        static void Main(string[] args)
        {
            string filePath = Path.Combine("Resources");

            ZipFile.CreateFromDirectory(filePath, "ZippedDirectory");
            ZipFile.ExtractToDirectory("ZippedDirectory", "UnzippedDirectory");
        }
    }
}