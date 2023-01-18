using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Models;
using EmployeeManagementSystem.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly IEmployeeRepository _employeeRepository;

        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly ApplicationDbContext _dbContext;

        public static IConfigurationRoot? Configuration
        {
            get; private set;
        }

        public EmployeeController(IEmployeeRepository employeeRepository, 
            IWebHostEnvironment webHostEnvironment, 
            ApplicationDbContext dbContext)
        {
            _employeeRepository = employeeRepository;
            _webHostEnvironment = webHostEnvironment;
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        #region API Calls
        [HttpGet]
        public JsonResult GetAll()
        {
            return Json(_employeeRepository.GetAll());
        }

        [HttpPost]
        public JsonResult Add(Employee employee)
        {
            return Json(_employeeRepository.Add(employee));
        }

        [HttpGet]
        public JsonResult GetById(int Id)
        {
            var employee = _employeeRepository.GetAll().Find(x => x.Id.Equals(Id));
            return Json(employee);
        }

        [HttpPost]
        public JsonResult Update(Employee employee)
        {
            return Json(_employeeRepository.Update(employee));
        }

        [HttpPost]
        public JsonResult Delete(int Id)
        {
            return Json(_employeeRepository.Delete(Id));
        }
        #endregion

        #region Excel Entry
        public IActionResult Excel()
        {
            return View();
        }

        public IActionResult Export()
        {
            var fileName = ExcelTemplate();
            var filePath = string.Format("{0}/{1}", _webHostEnvironment.WebRootPath, fileName);
            var excelFile = $"Excel Template.xlsx";
            var streamFile = System.IO.File.OpenRead(filePath);
            return new FileStreamResult(streamFile, "application/vnd.ms-excel") { FileDownloadName = excelFile };
        }

        private static string ExcelTemplate()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            Configuration = configuration.Build();

            var excelURL = Configuration.GetSection("ExcelTemplate");

            return "/excel/employees.xlsx";
        }


        [HttpPost]
        public void AddEmployees(List<Employee> employees)
        {
            _dbContext.Employees.AddRange(employees);

            _dbContext.SaveChanges();
        }
        #endregion
    }
}
