using System;
using System.Collections.Generic;
using System.Text;

namespace CustomDataStructures
{
    public class CustomList
    {
        private int[] items;
        private const int InitialCapacity = 2;
        
        public CustomList()
        {
            this.items = new int[InitialCapacity];
            this.Count = 0;
        }
  

        public int Count { get; private set; }

        public int this[int index]
        {

            get {

                if (index >= this.Count || index < 0)
                {
                    throw new IndexOutOfRangeException();
                }
                return this.items[index]; }

            set {

                if (index >= this.Count || index < 0)
                {
                    throw new IndexOutOfRangeException();
                }

                this.items[index] = value; }
        }

        private void Resize()
        {
        }

        private void Shrink()
        {
        }

        private void Shift()
        {
        }
    }
}
 