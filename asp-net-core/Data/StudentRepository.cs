using asp_net_core.Dto;
using asp_net_core.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace asp_net_core.Data
{
    public class StudentRepository : IStudentRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public StudentRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<StudentDto> GetStudentAsync(string studentCode)
        {
            var a = await _context.Students.Where(e => e.StudentCode == studentCode)
                            .ProjectTo<StudentDto>(_mapper.ConfigurationProvider)
                            .FirstOrDefaultAsync();
            return a;
        }
    }
}
