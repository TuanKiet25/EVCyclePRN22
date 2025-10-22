using Application.IServices;
using Application.ViewModels.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EVCycle.Pages.Auth
{
    public class VerifyOtpModel : PageModel
    {
        private readonly IAuthService _authService;

        public VerifyOtpModel(IAuthService authService)
        {
            _authService = authService;
        }

        [BindProperty]
        public string Email { get; set; } = string.Empty;

        [BindProperty]
        public string Otp { get; set; } = string.Empty;

        [TempData]
        public string? ErrorMessage { get; set; }

        [TempData]
        public string? SuccessMessage { get; set; }

        public IActionResult OnGet()
        {
            // Get email from TempData
            if (TempData["RegisterEmail"] != null)
            {
                Email = TempData["RegisterEmail"]?.ToString() ?? "";
                TempData.Keep("RegisterEmail");
            }
            else
            {
                return RedirectToPage("/Auth/Login");
            }

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            try
            {
                var request = new VerifyOtpRequest
                {
                    Email = Email,
                    Otp = Otp
                };

                var result = await _authService.VerifyOtpAsync(request);
                SuccessMessage = result;

                // Redirect to login page after success
                return RedirectToPage("/Auth/Login");
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
                TempData["RegisterEmail"] = Email;
                return Page();
            }
        }
    }
}

