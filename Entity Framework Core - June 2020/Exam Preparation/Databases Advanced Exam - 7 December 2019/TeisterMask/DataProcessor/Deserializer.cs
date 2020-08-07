namespace TeisterMask.DataProcessor
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using ValidationContext = System.ComponentModel.DataAnnotations.ValidationContext;

    using Data;
    using System.Text;
    using System.Xml.Serialization;
    using TeisterMask.DataProcessor.ImportDto;
    using TeisterMask.Data.Models;
    using System.IO;
    using System.Globalization;
    using TeisterMask.Data.Models.Enums;
    using Newtonsoft.Json;
    using System.Linq.Expressions;
    using System.Linq;

    public class Deserializer
    {
        private const string ErrorMessage = "Invalid data!";

        private const string SuccessfullyImportedProject
            = "Successfully imported project - {0} with {1} tasks.";

        private const string SuccessfullyImportedEmployee
            = "Successfully imported employee - {0} with {1} tasks.";

        public static string ImportProjects(TeisterMaskContext context, string xmlString)
        {
            StringBuilder sb = new StringBuilder();

            XmlSerializer xmlSerializer = new XmlSerializer(typeof(ImportProjectDto[]), new XmlRootAttribute("Projects"));

            List<Project> projects = new List<Project>();

            using (StringReader stringReader = new StringReader(xmlString))
            {
                ImportProjectDto[] projectDtos = (ImportProjectDto[])xmlSerializer.Deserialize(stringReader);

                //Validate Projects

                foreach (ImportProjectDto projectDto in projectDtos)
                {
                    if (!IsValid(projectDto))
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }

                    //Validate OpenDate
                    DateTime projectOpenDate;
                    bool isProjectOpenDateValid = DateTime.TryParseExact(projectDto.OpenDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out projectOpenDate);

                    if (!isProjectOpenDateValid)
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }

                    //Validate DueDate (not marked in the Doc)
                    DateTime? projectDueDate;
                    if (!String.IsNullOrEmpty(projectDto.DueDate))
                    {
                        //If I do receive DueDate in XML:
                        DateTime projectDueDateValue;
                        bool isProjectDueDateValid = DateTime.TryParseExact(projectDto.DueDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out projectDueDateValue);

                        if (!isProjectDueDateValid)
                        {
                            sb.AppendLine(ErrorMessage);
                            continue;
                        }

                        projectDueDate = projectDueDateValue;
                    }

                    else
                    {
                        //If I do not receive DueDate in XML!
                        projectDueDate = null;
                    }

                    Project pr = new Project()
                    {
                        Name = projectDto.Name,
                        OpenDate = projectOpenDate,
                        DueDate = projectDueDate
                    };


                    //Validate Tasks
                    foreach (ImportProjectTaskDto taskDto in projectDto.Tasks)
                    {
                        if (!IsValid(taskDto))
                        {
                            //Invalid name, missing OpenDate or DueDate
                            sb.AppendLine(ErrorMessage);
                            continue;
                        }

                        //Validate OpenDate
                        DateTime taskOpenDate;
                        bool isTaskOpenDateValid = DateTime.TryParseExact(taskDto.OpenDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out taskOpenDate);

                        if (!isTaskOpenDateValid)
                        {
                            sb.AppendLine(ErrorMessage);
                            continue;
                        }

                        //Validate DueDate
                        DateTime taskDueDate;
                        bool isTaskDueDateValid = DateTime.TryParseExact(taskDto.DueDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out taskDueDate);

                        if (!isTaskDueDateValid)
                        {
                            sb.AppendLine(ErrorMessage);
                            continue;
                        }

                        //Validate if Task OpeDate is before Project OpenDate
                        if (taskOpenDate < projectOpenDate)
                        {
                            sb.AppendLine(ErrorMessage);
                            continue;
                        }

                        //Validate if Task DueDate is after Project DueDate
                        if (projectDueDate.HasValue)
                        {
                            if (taskDueDate > projectDueDate.Value)
                            {
                                sb.AppendLine(ErrorMessage);
                                continue;
                            }
                        }

                        pr.Tasks.Add(new Task
                        {
                            Name = taskDto.Name,
                            OpenDate = taskOpenDate,
                            DueDate = taskDueDate,
                            ExecutionType = (ExecutionType)taskDto.ExecutionType,
                            LabelType = (LabelType)taskDto.LabelType
                        });
                    }

                    projects.Add(pr);
                    sb.AppendLine(String.Format(SuccessfullyImportedProject, pr.Name, pr.Tasks.Count));
                }

                context.Projects.AddRange(projects);
                context.SaveChanges();
            }

            return sb.ToString().TrimEnd();
        }

        public static string ImportEmployees(TeisterMaskContext context, string jsonString)
        {
            StringBuilder sb = new StringBuilder();

            ImportEmployeeDto[] employeeDtos = JsonConvert.DeserializeObject<ImportEmployeeDto[]>(jsonString);

            List<Employee> employees = new List<Employee>();


            foreach (ImportEmployeeDto employeeDto in employeeDtos)
            {
                //Validation
                if (!IsValid(employeeDto))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                //Create a new method and validate if username is valid
                if (!IsUsernameValid(employeeDto.Username))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                //Create a new Employee if above is valid
                Employee em = new Employee()
                {
                    Username = employeeDto.Username,
                    Email = employeeDto.Email,
                    Phone = employeeDto.Phone
                };

                //Take only the unique tasks
                foreach (var taskId in employeeDto.Tasks.Distinct())
                {
                    Task task = context
                        .Tasks
                        .FirstOrDefault(t => t.Id == taskId);

                    //Check if task is null
                    if (task == null)
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }

                    em.EmployeesTasks.Add(new EmployeeTask
                    {
                        Employee = em,
                        Task = task
                    });
                }

                employees.Add(em);
                sb.AppendLine(String.Format(SuccessfullyImportedEmployee, em.Username, em.EmployeesTasks.Count));
            }

            context.Employees.AddRange(employees); //Automatically will add new EmployeeTasks
            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }

        private static bool IsUsernameValid(string username)
        {
            foreach (char ch in username)
            {
                if (!Char.IsLetterOrDigit(ch))
                {
                    return false;
                }
            }

            return true;
        }

        private static bool IsValid(object dto)
        {
            var validationContext = new ValidationContext(dto);
            var validationResult = new List<ValidationResult>();

            return Validator.TryValidateObject(dto, validationContext, validationResult, true);
        }
    }
}