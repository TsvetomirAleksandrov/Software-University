using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading.Tasks;

namespace TeisterMask.Data.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required, RegularExpression("^[A-Za-z0-9]+")]
        [StringLength(40, MinimumLength = 3)]
        public string Username { get; set; }

        [Required, RegularExpression("^(.+)@(.+)$")] //?
        public string Email { get; set; }

        [Required, RegularExpression(@"\d{3}-\d{3}-\d{4}")]
        public string Phone { get; set; }

        public ICollection<EmployeeTask> EmployeesTasks { get; set; } = new HashSet<EmployeeTask>();
    }
}
