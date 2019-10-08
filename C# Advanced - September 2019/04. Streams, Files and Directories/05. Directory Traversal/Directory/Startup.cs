using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Directory_Traversal
{
    class Program
    {
        static void Main(string[] args)
        {
            var fileList = new Dictionary<string, List<FileInfo>>();
            string path = Path.Combine("..", "..", "..", "Directory");
            string[] fileNames = Directory.GetFiles(path);

            foreach (var file in fileNames)
            {
                FileInfo fileInfo = new FileInfo(file);
                string fileExtention = fileInfo.Extension;

                if (!fileList.ContainsKey(fileExtention))
                {
                    fileList.Add(fileExtention, new List<FileInfo>());
                }

                fileList[fileExtention].Add(fileInfo);
            }

            string outputFilePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "output.txt");
            using (var report = new StreamWriter(outputFilePath))
            {
                foreach (var file in fileList.OrderByDescending(x => x.Value.Count).ThenBy(x => x.Key))
                {
                    report.WriteLine(file.Key.ToString());

                    foreach (var item in file.Value.OrderBy(x => x.Length))
                    {
                        report.WriteLine($"--{item.Name} - {(item.Length / 1024.0):f3}kb");
                    }
                }
            }
        }
    }


}