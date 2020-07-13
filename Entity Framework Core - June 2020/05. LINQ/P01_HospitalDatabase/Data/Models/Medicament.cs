using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using P01_HospitalDatabase.Common;

namespace P01_HospitalDatabase.Data.Models
{
    public class Medicament
    {
        public Medicament()
        {
            this.Prescriptions = new List<PatientMedicament>();
        }

        [Key]
        public int MedicamentId { get; set; }

        [Required]
        [MaxLength(GlobalConstants.NameMaxLength)]
        public string Name { get; set; }

        public ICollection<PatientMedicament> Prescriptions { get; set; }
    }
}
