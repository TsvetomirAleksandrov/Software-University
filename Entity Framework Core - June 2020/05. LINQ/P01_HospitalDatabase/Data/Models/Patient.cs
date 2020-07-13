using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using P01_HospitalDatabase.Common;

namespace P01_HospitalDatabase.Data.Models
{
    public class Patient
    {
        public Patient()
        {
            this.Visitations = new List<Visitation>();
            this.Diagnoses = new List<Diagnose>();
            this.Prescriptions = new List<PatientMedicament>();
        }

        [Key]
        public int PatientId { get; set; }

        [Required]
        [MaxLength(GlobalConstants.NameMaxLength)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(GlobalConstants.NameMaxLength)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(GlobalConstants.AddressMaxLength)]
        public string Address { get; set; }

        [Required]
        [MaxLength(GlobalConstants.EmailMaxLength)]
        public string Email { get; set; }

        public bool HasInsurance { get; set; }

        public ICollection<Visitation> Visitations { get; set; }

        public ICollection<Diagnose> Diagnoses { get; set; }

        public ICollection<PatientMedicament> Prescriptions { get; set; }

    }
}
