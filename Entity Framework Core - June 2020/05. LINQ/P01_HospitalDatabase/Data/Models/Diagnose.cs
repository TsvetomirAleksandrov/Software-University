using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using P01_HospitalDatabase.Common;

namespace P01_HospitalDatabase.Data.Models
{
   public class Diagnose
    {
        [Key]
        public int DiagnoseId { get; set; }

        [Required]
        [MaxLength(GlobalConstants.NameMaxLength)]
        public string Name { get; set; }

        [MaxLength(GlobalConstants.CommentsMaxLength)]
        public string Comments { get; set; }

        public int PatientId { get; set; }
        public virtual Patient Patient { get; set; }
    }
}
