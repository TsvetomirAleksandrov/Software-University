using System;
using System.Collections.Generic;
using System.Text;

namespace P01_StudentSystem.Data.Models
{
    using Enums;
    public class Resource
    {
        public int ResourceId { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public ResourceType ResourceType { get; set; }

        public int CourseId { get; set; }
        public virtual Course Course { get; set; }
    }
}
