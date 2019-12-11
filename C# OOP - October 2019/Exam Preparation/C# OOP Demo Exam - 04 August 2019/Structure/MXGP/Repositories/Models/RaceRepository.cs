using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MXGP.Models.Races.Contracts;
using MXGP.Repositories.Contracts;

namespace MXGP.Repositories.Models
{
    public class RaceRepository : IRepository<IRace>
    {
        private readonly List<IRace> races;

        public RaceRepository()
        {
            this.races = new List<IRace>();
        }

        public IRace GetByName(string name)
        {
            return this.races.FirstOrDefault(r => r.Name == name);
        }

        public IReadOnlyCollection<IRace> GetAll()
        {
            return this.races.AsReadOnly();
        }

        public void Add(IRace model)
        {
            this.races.Add(model);
        }

        public bool Remove(IRace model)
        {
            return this.races.Remove(model);
        }
    }
}
