namespace TeisterMask.DataProcessor
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using ValidationContext = System.ComponentModel.DataAnnotations.ValidationContext;

    using Data;
    using System.Xml.Serialization;
    using TeisterMask.DataProcessor.ImportDto;
    using System.IO;
    using System.Text;
    using TeisterMask.Data.Models;
    using System.Globalization;
    using TeisterMask.Data.Models.Enums;
    using Newtonsoft.Json;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;

    public class Deserializer
    {
        private const string ErrorMessage = "Invalid data!";

        private const string SuccessfullyImportedProject
            = "Successfully imported project - {0} with {1} tasks.";

        private const string SuccessfullyImportedEmployee
            = "Successfully imported employee - {0} with {1} tasks.";

        public static string ImportProjects(TeisterMaskContext context, string xmlString)
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(ProjectTaskImportDto[]),
                new XmlRootAttribute("Projects"));

            var projectDtos = (ProjectTaskImportDto[])xmlSerializer.Deserialize(new StringReader(xmlString));

            StringBuilder sb = new StringBuilder();

            List<Project> importProjects = new List<Project>();
            List<Task> importTasks = new List<Task>();
            int tasksCount = 0;

            foreach (var dto in projectDtos)
            {
                if (dto.DueDate == "")
                {
                    dto.DueDate = null;
                }

                if (IsValid(dto))
                {
                    Project project = null;

                    if (dto.DueDate != null)
                    {
                        project = new Project
                        {
                            Name = dto.Name,
                            OpenDate = DateTime.ParseExact(dto.OpenDate, "dd/MM/yyyy", CultureInfo.InvariantCulture),
                            DueDate = DateTime.ParseExact(dto.DueDate, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                        };
                    }
                    else
                    {
                        project = new Project
                        {
                            Name = dto.Name,
                            OpenDate = DateTime.ParseExact(dto.OpenDate, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                        };
                    }

                    importProjects.Add(project);

                    if (project.DueDate != null)
                    {
                        foreach (var dtoTask in dto.Tasks)
                        {
                            if (IsValidTaskDto(dtoTask)
                            && DateTime.ParseExact(dtoTask.OpenDate, "dd/MM/yyyy", CultureInfo.InvariantCulture) > project.OpenDate
                            && DateTime.ParseExact(dtoTask.DueDate, "dd/MM/yyyy", CultureInfo.InvariantCulture) < project.DueDate)
                            {
                                Task task = new Task
                                {
                                    Name = dtoTask.Name,
                                    OpenDate = DateTime.ParseExact(dtoTask.OpenDate, "dd/MM/yyyy", CultureInfo.InvariantCulture),
                                    DueDate = DateTime.ParseExact(dtoTask.DueDate, "dd/MM/yyyy", CultureInfo.InvariantCulture),
                                    ExecutionType = Enum.Parse<ExecutionType>(dtoTask.ExecutionType.ToString()),
                                    LabelType = Enum.Parse<LabelType>(dtoTask.LabelType.ToString()),
                                    Project = project
                                };
                                importTasks.Add(task);
                                tasksCount++;
                            }
                            else
                            {
                                sb.AppendLine(ErrorMessage);
                            }
                        }
                    }
                    else
                    {
                        foreach (var dtoTask in dto.Tasks)
                        {
                            if (IsValidTaskDto(dtoTask)
                            && DateTime.ParseExact(dtoTask.OpenDate, "dd/MM/yyyy", CultureInfo.InvariantCulture) > project.OpenDate)
                            {
                                Task task = new Task
                                {
                                    Name = dtoTask.Name,
                                    OpenDate = DateTime.ParseExact(dtoTask.OpenDate, "dd/MM/yyyy", CultureInfo.InvariantCulture),
                                    DueDate = DateTime.ParseExact(dtoTask.DueDate, "dd/MM/yyyy", CultureInfo.InvariantCulture),
                                    ExecutionType = Enum.Parse<ExecutionType>(dtoTask.ExecutionType.ToString()),
                                    LabelType = Enum.Parse<LabelType>(dtoTask.LabelType.ToString()),
                                    Project = project
                                };
                                importTasks.Add(task);
                                tasksCount++;
                            }
                            else
                            {
                                sb.AppendLine(ErrorMessage);
                            }
                        }
                    }

                    sb.AppendLine(string.Format(SuccessfullyImportedProject, dto.Name, tasksCount));
                    tasksCount = 0;
                }
                else
                {
                    sb.AppendLine(ErrorMessage);
                }
            }

            context.Projects.AddRange(importProjects);
            context.Tasks.AddRange(importTasks);
            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }


        public static string ImportEmployees(TeisterMaskContext context, string jsonString)
        {
            var employeesDtos = JsonConvert.DeserializeObject<ImportEmployeeTaskDto[]>(jsonString);

            List<Employee> importEmployees = new List<Employee>();
            List<EmployeeTask> importEmployeeTasks = new List<EmployeeTask>();

            StringBuilder sb = new StringBuilder();

            int tasksCount = 0;

            foreach (var employeeDto in employeesDtos)
            {
                if (IsValid(employeeDto))
                {
                    Employee employee = new Employee
                    {
                        Username = employeeDto.Username,
                        Email = employeeDto.Email,
                        Phone = employeeDto.Phone
                    };

                    importEmployees.Add(employee);


                    foreach (var taskId in employeeDto.Tasks.Distinct())
                    {
                        if (IsTaskIdValid(context, taskId))
                        {
                            EmployeeTask employeeTask = new EmployeeTask
                            {
                                TaskId = taskId,
                                Employee = employee
                            };

                            importEmployeeTasks.Add(employeeTask);
                            tasksCount++;
                        }
                        else
                        {
                            sb.AppendLine(ErrorMessage);
                        }
                    }

                    sb.AppendLine(string.Format(SuccessfullyImportedEmployee, employeeDto.Username, tasksCount));
                    tasksCount = 0;
                }
                else
                {
                    sb.Append(ErrorMessage);
                }
            }


            context.Employees.AddRange(importEmployees);
            context.EmployeesTasks.AddRange(importEmployeeTasks);

            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }

        private static bool IsValid(object dto)
        {
            var validationContext = new ValidationContext(dto);
            var validationResult = new List<ValidationResult>();

            return Validator.TryValidateObject(dto, validationContext, validationResult, true);
        }

        private static bool IsValidTaskDto(TaskImportDto task)
        {
            var validationContext = new ValidationContext(task);
            var validationResult = new List<ValidationResult>();

            return Validator.TryValidateObject(task, validationContext, validationResult, true);
        }

        private static bool IsTaskIdValid(TeisterMaskContext context, int taskId)
            => context.Tasks.Any(t => t.Id == taskId);
        
    }
}