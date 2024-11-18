using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TestApp.Pages
{
    public class PrivacyModel : PageModel
    {
        private readonly ILogger<PrivacyModel> _logger;
        public List<string> TableItems { get; set; } = new();
        [BindProperty]
        public string SearchTerm { get; set; }

        public PrivacyModel(ILogger<PrivacyModel> logger)
        {
            _logger = logger;
        }

        public void OnGet(string search = "")
        {
            SearchTerm = search;
            TableItems = GetTableItems().Where(str => str.Contains(SearchTerm)).ToList();
        }

        public IActionResult OnPost()
        {
            return RedirectToPage("Privacy", new { search = SearchTerm });
        }

        public List<string> GetTableItems()
        {
            return new() { "this is a test", "random string of text", "im really testing you right now"}; 
        }
    }
}
