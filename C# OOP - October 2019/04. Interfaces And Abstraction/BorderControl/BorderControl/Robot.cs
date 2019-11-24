using System;
using System.Collections.Generic;
using System.Text;

namespace BorderControl
{
    public class Robot : IIdentifiablle
    {
        public string Id { get; private set; }

        private string model;

        public Robot(string model, string id)
        {
            this.model = model;
            this.Id = id;
        }
    }
}
