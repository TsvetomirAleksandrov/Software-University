using System.Collections.Generic;
using System.Linq;
using AutoMapper.QueryableExtensions;
using FastFood.Models;

namespace FastFood.Core.Controllers
{
    using System;
    using AutoMapper;
    using Data;
    using Microsoft.AspNetCore.Mvc;
    using ViewModels.Employees;

    public class EmployeesController : Controller
    {
        private readonly FastFoodContext context;
        private readonly IMapper mapper;

        public EmployeesController(FastFoodContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public IActionResult Register()
        {
            List<RegisterEmployeeViewModel> positions = this.context
                .Positions
                .ProjectTo<RegisterEmployeeViewModel>
                    (this.mapper.ConfigurationProvider)
                .ToList();

            return this.View(positions);
        }

        [HttpPost]
        public IActionResult Register(RegisterEmployeeInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return this.RedirectToAction("Error", "Home");
            }


            Employee employee = this.mapper.Map<Employee>(model);


            this.context.Employees.Add(employee);
            this.context.SaveChanges();

            return this.RedirectToAction("All");
        }

        public IActionResult All()
        {
            List<EmployeesAllViewModel> employees = this.context
                .Employees
                .ProjectTo<EmployeesAllViewModel>
                    (this.mapper.ConfigurationProvider)
                .ToList();

            return this.View(employees);
        }
    }
}
