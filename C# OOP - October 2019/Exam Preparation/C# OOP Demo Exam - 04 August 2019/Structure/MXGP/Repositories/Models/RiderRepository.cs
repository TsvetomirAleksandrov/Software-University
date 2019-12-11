using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MXGP.Models.Riders.Contracts;
using MXGP.Repositories.Contracts;

namespace MXGP.Repositories.Models
{
    public class RiderRepository : IRepository<IRider>
    {
        private readonly List<IRider> riders;

        public RiderRepository()
        {
            this.riders = new List<IRider>();
        }
        
        public IRider GetByName(string name)
        {
            return this.riders.FirstOrDefault(r => r.Name == name);
        }

        public IReadOnlyCollection<IRider> GetAll()
        {
            return this.riders.AsReadOnly();
        }

        public void Add(IRider model)
        {
            this.riders.Add(model);
        }

        public bool Remove(IRider model)
        {
            return this.riders.Remove(model);
        }
    }
}
