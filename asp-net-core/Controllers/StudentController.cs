using Abp.Domain.Repositories;
using asp_net_core.Data;
using asp_net_core.Dto;
using asp_net_core.Entities;
using asp_net_core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace asp_net_core.Controllers
{
    public class StudentController : BaseController
    {
        private readonly DataContext _context;
        private readonly IStudentRepository _studentRepo;

        public StudentController(DataContext context, IStudentRepository studentRepo)
        {
            _context = context;
            _studentRepo = studentRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }
        [HttpGet("{studentCode}", Name ="GetStudent")]
        public async Task<ActionResult<Student>> GetStudent(string studentCode)
        {
            return await _context.Students.FirstOrDefaultAsync(e => e.StudentCode == studentCode);
        }
    }
}
