using Abp.Application.Services.Dto;
using System;

namespace asp_net_core.Dto
{
    public class StudentDto : EntityDto<long>
    {
        public string StudentCode { get; set; }
        public string Token { get; set; }
        public string StudentName { get; set; }
        public string StudentAddress { get; set; }
        public int ClassId { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public bool Sex { get; set; }
    }
}
