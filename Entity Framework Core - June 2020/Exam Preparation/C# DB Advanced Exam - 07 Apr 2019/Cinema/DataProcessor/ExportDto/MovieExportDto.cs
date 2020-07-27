using System;
using System.Collections.Generic;
using System.Text;
using Cinema.Data.Models;

namespace Cinema.DataProcessor.ExportDto
{
    public class MovieExportDto
    {
        public string MovieName { get; set; }

        public string Rating { get; set; }

        public string TotalIncomes { get; set; }
        public ICollection<CustomerMovieExportDto> Customers { get; set; }
    }
}
