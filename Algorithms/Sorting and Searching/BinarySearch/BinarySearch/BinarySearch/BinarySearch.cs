using System;
using System.Collections.Generic;
using System.Text;

namespace BinarySearch
{
    public class BinarySearch
    {
        public static int IndexOf(int[] arr, int key)
        {
            int low = 0;
            int high = arr.Length - 1;

            while (low <= high)
            {
                int mid = low + (high - low) / 2;

                if (key < arr[mid])
                {
                    high = mid - 1;
                }
                else if (key > arr[mid])
                {
                    low = mid + 1;
                }
                else
                {
                    return mid;
                }
            }

            return -1;
        }
    }
}
