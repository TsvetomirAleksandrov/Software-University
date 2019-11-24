using System;
using System.Collections.Generic;
using System.Text;

namespace ClassBoxData
{
    public class Box
    {
        private double length;
        private double width;
        private double height;

        public Box(double length, double wiidth, double height)
        {
            this.Length = length;
            this.Height = height;
            this.Width = wiidth;
        }


        public double Height
        {
            get { return this.height; }
            set
            {
                if (value > 0)
                {
                    this.height = value;
                }
                else
                {
                    Console.WriteLine("Height cannot be zero or negative.");
                    throw new ArgumentException();
                }
            }
        }


        public double Width
        {
            get { return this.width; }
            set {
                if (value > 0)
                {
                    this.width = value;
                }
                else
                {
                    Console.WriteLine("Width cannot be zero or negative.");
                    throw new ArgumentException();
                }
            } 
        }

        public double Length
        {
            get { return this.length; }
            set
            {
                if (value > 0)
                {
                    this.length = value;
                }
                else
                {
                    Console.WriteLine("Length cannot be zero or negative.");
                    throw new ArgumentException();
                }
            }
        }

        public double SurfaceArea()
        {
            double surface = 2 * this.length * this.width +
                2 * this.length * this.height +
                2 * this.width * this.height;
            return surface;
        }

        public double LateralSurfaceArea()
        {
            double surface = 2 * this.length * this.height +
                2 * this.width * this.height;
            return surface;
        }

        public double Volume()
        {
            double volume = this.length * this.height * this.width;
            return volume;
        }
    }
}
