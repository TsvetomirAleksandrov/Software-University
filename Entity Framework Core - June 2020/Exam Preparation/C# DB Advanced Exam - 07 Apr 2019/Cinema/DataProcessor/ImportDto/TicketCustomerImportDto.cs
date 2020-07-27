using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Xml.Serialization;
using Cinema.Data.Models;

namespace Cinema.DataProcessor.ImportDto
{
    [XmlType("Ticket")]
    public class TicketCustomerImportDto
    {
        [Required]
        [Range(typeof(decimal), "0.01", "10000000000000000000")]
        [XmlElement("Price")]
        public decimal Price { get; set; }

        [Required]
        [XmlElement("ProjectionId")]
        public int ProjectionId { get; set; }
    }
}
