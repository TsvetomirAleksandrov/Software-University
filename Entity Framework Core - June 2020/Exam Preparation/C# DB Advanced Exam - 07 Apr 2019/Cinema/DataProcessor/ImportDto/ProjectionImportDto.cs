using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Xml.Serialization;
using Cinema.Data.Models;

namespace Cinema.DataProcessor.ImportDto
{
    [XmlType("Projection")]
    public class ProjectionImportDto
    {
        [Required]
        [XmlElement("MovieId")]
        public int MovieId { get; set; }

        [Required]
        [XmlElement("HallId")]
        public int HallId { get; set; }

        [Required]
        [XmlElement("DateTime")]
        public string DateTime { get; set; }
    }
}
