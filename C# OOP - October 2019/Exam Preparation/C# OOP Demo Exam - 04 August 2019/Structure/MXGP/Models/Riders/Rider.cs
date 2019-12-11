using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using MXGP.Models.Motorcycles.Contracts;
using MXGP.Models.Riders.Contracts;
using MXGP.Utilities.Messages;

namespace MXGP.Models.Riders
{
    public class Rider : IRider
    {
        private string name;

        public Rider(string name)
        {
            this.Name = name;
            this.CanParticipate = false;
        }
        public string Name
        {
            get => this.name;

            private set
            {
                if (string.IsNullOrEmpty(value) || value.Length < 5)
                {
                    throw new ArgumentException(string.Format(ExceptionMessages.InvalidName, value, 5));
                }

                this.name = value;
            }
        }
        public IMotorcycle Motorcycle { get; private set; }
        public int NumberOfWins { get; private set; }
        public bool CanParticipate { get; private set; }
        public void WinRace()
        {
            this.NumberOfWins++;
        }

        public void AddMotorcycle(IMotorcycle motorcycle)
        {
            if (motorcycle == null)
            {
                throw new ArgumentException(string.Format(ExceptionMessages.MotorcycleInvalid));
            }

            this.Motorcycle = motorcycle;
            this.CanParticipate = true;
        }
    }
}
