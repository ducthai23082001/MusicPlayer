using asp_net_core.Data;
using asp_net_core.Dto;
using asp_net_core.Entities;
using asp_net_core.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace asp_net_core.Controllers
{
    public class AccountController : BaseController
    {
        private readonly UserManager<Student> _studentManager;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<Student> studentManager, IMapper mapper, DataContext context, 
                    ITokenService tokenService)
        {
            _studentManager = studentManager;
            _mapper = mapper;
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<StudentDto>> Register(RegisterDto registerDto)
        {
            if (await UserExist(registerDto.StudentCode)) return BadRequest("StudentCode is taken");
            var student = _mapper.Map<Student>(registerDto);

            student.Name = registerDto.StudentCode.ToLower();

            var result = await _studentManager.CreateAsync(student, registerDto.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);
            var roleResult = await _studentManager.AddToRoleAsync(student, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new StudentDto
            {
                StudentName = student.Name,
                Token = await _tokenService.CreateToken(student),
                StudentCode = student.StudentCode,
                ClassId = student.ClassId
            };
        }

        private async Task<bool> UserExist(string userName)
        {
            if (await _context.Students.AnyAsync(e => e.StudentCode == userName))
                return true;
            return false;
        }
    }
}
