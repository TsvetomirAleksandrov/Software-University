namespace TeisterMask.DataProcessor
{
    using System;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Serialization;
    using Data;
    using Data.Models;
    using Newtonsoft.Json;
    using TeisterMask.Data.Models.Enums;
    using TeisterMask.DataProcessor.ExportDto;
    using Formatting = Newtonsoft.Json.Formatting;

    public class Serializer
    {
        public static string ExportProjectWithTheirTasks(TeisterMaskContext context)
        {
            var projects = context
                .Projects
                .Where(p => p.Tasks.Count > 0)
                .Select(p => new ProjectExportDto
                {
                    Name = p.Name,
                    TasksCount = p.Tasks.Count,
                    HasEndDate = p.DueDate != null ? "Yes" : "No",
                    Tasks = p.Tasks.Select(t => new TaskExportDto
                    {
                        Name = t.Name,
                        Label = t.LabelType.ToString()
                    })
                    .OrderBy(t => t.Name)
                    .ToArray()
                })
                .OrderByDescending(p => p.TasksCount)
                .ThenBy(p => p.Name)
                .ToArray();

            XmlSerializer xmlSerializer = new XmlSerializer(typeof(ProjectExportDto[]),
                new XmlRootAttribute("Projects"));

            var namespaces = new XmlSerializerNamespaces();
            namespaces.Add("", "");

            StringBuilder sb = new StringBuilder();

            using (StringWriter writer = new StringWriter(sb))
            {
                xmlSerializer.Serialize(writer, projects, namespaces);
            }

            return sb.ToString().TrimEnd();
        }

        public static string ExportMostBusiestEmployees(TeisterMaskContext context, DateTime date)
        {
            var employees = context
                .Employees
                .Where(e => e.EmployeesTasks.Any(et => et.Task.OpenDate >= date))
                .Select(e => new
                {
                    e.Username,
                    Tasks = e.EmployeesTasks.Select(et => new
                    {
                        TaskName = et.Task.Name,
                        OpenDate = et.Task.OpenDate.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture),
                        DueDate = et.Task.DueDate.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture),
                        LabelType = et.Task.LabelType.ToString(),
                        ExecutionType = et.Task.ExecutionType.ToString()
                    })
                    .OrderByDescending(x => DateTime.ParseExact(x.DueDate, "MM/dd/yyyy", CultureInfo.InvariantCulture))
                    .ThenBy(x => x.TaskName)
                    .ToArray()
                })
                .OrderByDescending(x => x.Tasks.Count())
                .ThenBy(x => x.Username)
                .Take(10)
                .ToArray();

            string result = JsonConvert.SerializeObject(employees, Formatting.Indented);

            return result;
        }
    }
}
