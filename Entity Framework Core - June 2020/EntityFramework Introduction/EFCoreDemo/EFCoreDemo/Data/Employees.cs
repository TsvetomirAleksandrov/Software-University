using System;
using System.Collections.Generic;

namespace EFCoreDemo.Data
{
    public class Employees
    {
        public Employees()
        {
            Departments = new HashSet<Departments>();
            EmployeesProjects = new HashSet<EmployeesProjects>();
            InverseManager = new HashSet<Employees>();
        }

        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string JobTitle { get; set; }
        public int DepartmentId { get; set; }
        public int? ManagerId { get; set; }
        public DateTime HireDate { get; set; }
        public decimal Salary { get; set; }
        public int? AddressId { get; set; }

        public virtual Addresses Address { get; set; }
        public virtual Departments Department { get; set; }
        public virtual Employees Manager { get; set; }
        public virtual ICollection<Departments> Departments { get; set; }
        public virtual ICollection<EmployeesProjects> EmployeesProjects { get; set; }
        public virtual ICollection<Employees> InverseManager { get; set; }
    }
}
