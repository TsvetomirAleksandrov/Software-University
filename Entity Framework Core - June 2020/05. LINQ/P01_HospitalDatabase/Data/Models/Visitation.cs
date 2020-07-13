using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using P01_HospitalDatabase.Common;

namespace P01_HospitalDatabase.Data.Models
{
    public class Visitation
    {
        [Key]
        public int VisitationId { get; set; }
        
        public DateTime Date { get; set; }

        [MaxLength(GlobalConstants.CommentsMaxLength)]
        public string Comments { get; set; }

        public int PatientId { get; set; }
        public virtual Patient Patient { get; set; }

        public int? DoctorId { get; set; }
        public Doctor Doctor { get; set; }
    }
}
