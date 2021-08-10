using Abp.Domain.Entities;
using System;

namespace asp_net_core.Entities
{
    public class Student : Entity<int>
    {
        public string StudentCode { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int ClassId { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public bool Sex { get; set; }
    }
}
