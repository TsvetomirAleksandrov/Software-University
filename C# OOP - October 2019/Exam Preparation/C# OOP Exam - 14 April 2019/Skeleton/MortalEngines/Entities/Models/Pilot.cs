using System;
using System.Collections.Generic;
using System.Text;
using MortalEngines.Entities.Contracts;

namespace MortalEngines.Entities.Models
{
   public class Pilot : IPilot
   {
       private string name;
       private readonly List<IMachine> machines;

       public Pilot(string name)
       {
           this.Name = name;
           this.machines = new List<IMachine>();
       }

       public string Name
       {
           get { return name; }
           set
           {
               if (string.IsNullOrWhiteSpace(value))
               {
                   throw  new ArgumentException("Pilot name cannot be null or empty string.");
               }

               name = value;
           }
       }
        public void AddMachine(IMachine machine)
        {
            if (machine == null)
            {
                throw new NullReferenceException("Null machine cannot be added to the pilot.");
            }
            this.machines.Add(machine);
        }

        public string Report()
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendLine($"{this.Name} - {this.machines.Count} machines");

            foreach (IMachine machine in this.machines)
            {
                sb.AppendLine(machine.ToString());
            }

            return sb.ToString().TrimEnd();
        }
    }
}
