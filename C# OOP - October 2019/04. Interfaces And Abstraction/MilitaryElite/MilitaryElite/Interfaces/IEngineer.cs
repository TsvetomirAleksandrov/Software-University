using System.Collections.Generic;
using MilitaryElite.Models;

namespace MilitaryElite.Interfaces
{
    public interface IEngineer
    {
        ICollection<Repair> Repairs { get; }
    }
}