using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TestApp.Pages
{
    public class ComponentTestModel : PageModel
    {
        [BindProperty]
        public string Result { get; set; } = "";
        public void OnGet()
        {
        }
        public IActionResult OnGetSendDateTime()
        {
            return Content($"After Request: {DateTime.Now.ToString()}");
        }
        public void OnPost()
        {
        }
    }
}
