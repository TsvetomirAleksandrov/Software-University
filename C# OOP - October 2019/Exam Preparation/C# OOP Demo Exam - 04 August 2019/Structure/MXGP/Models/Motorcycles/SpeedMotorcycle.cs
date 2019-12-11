using System;
using System.Collections.Generic;
using System.Text;
using MXGP.Models.Motorcycles.Contracts;
using MXGP.Utilities.Messages;

namespace MXGP.Models.Motorcycles
{
    public class SpeedMotorcycle : Motorcycle, IMotorcycle
    {
        private const int InitialCubicCentimeters = 125;
        private const int InitialMinimumHorsePower = 50;
        private const int InitialMaximumHorsePower = 69;

        public SpeedMotorcycle(string model, int horsePower) 
            : base(model, horsePower, InitialCubicCentimeters)
        {
        }

        public override int HorsePower
        {
            get => base.HorsePower;

            protected set
            {
                if (value < InitialMinimumHorsePower || value > InitialMinimumHorsePower)
                {
                    throw new ArgumentException(string.Format(ExceptionMessages.InvalidHorsePower, value));
                }

                base.HorsePower = value;
            }
        }
    }
}
