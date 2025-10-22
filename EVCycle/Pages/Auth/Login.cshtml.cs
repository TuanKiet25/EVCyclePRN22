using Application.IServices;
using Application.ViewModels.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EVCycle.Pages.Auth
{
    public class LoginModel : PageModel
    {
        private readonly IAuthService _authService;

        public LoginModel(IAuthService authService)
        {
            _authService = authService;
        }

        [BindProperty]
        public LoginRequestViewModel LoginRequest { get; set; } = new();

        [BindProperty]
        public RegisterRequestViewModel RegisterRequest { get; set; } = new();

        [BindProperty]
        public string FormType { get; set; } = string.Empty;

        [TempData]
        public string? LoginErrorMessage { get; set; }

        [TempData]
        public string? RegisterErrorMessage { get; set; }

        [TempData]
        public string? SuccessMessage { get; set; }

        public void OnGet()
        {
            // Check if already logged in
            if (HttpContext.Session.GetString("Token") != null)
            {
                Response.Redirect("/Index");
            }
        }

        public async Task<IActionResult> OnPostAsync()
        {
            try
            {
                if (FormType == "Login")
                {
                    // Validate input
                    if (string.IsNullOrEmpty(LoginRequest.Username) || string.IsNullOrEmpty(LoginRequest.Password))
                    {
                        LoginErrorMessage = "Vui lòng điền đầy đủ thông tin";
                        return Page();
                    }

                    // Login logic
                    var response = await _authService.LoginAsync(LoginRequest);
                    
                    // Store token in session
                    HttpContext.Session.SetString("Token", response.Token);
                    HttpContext.Session.SetString("Username", LoginRequest.Username ?? "");

                    SuccessMessage = "Đăng nhập thành công!";
                    return RedirectToPage("/Index");
                }
                else if (FormType == "Register")
                {
                    // Validate input - yêu cầu tất cả các trường
                    if (string.IsNullOrEmpty(RegisterRequest.Username) || 
                        string.IsNullOrEmpty(RegisterRequest.Email) || 
                        string.IsNullOrEmpty(RegisterRequest.Password) ||
                        string.IsNullOrEmpty(RegisterRequest.FirstName) ||
                        string.IsNullOrEmpty(RegisterRequest.LastName) ||
                        string.IsNullOrEmpty(RegisterRequest.PhoneNumber) ||
                        string.IsNullOrEmpty(RegisterRequest.Address))
                    {
                        RegisterErrorMessage = "Vui lòng điền đầy đủ tất cả thông tin";
                        return Page();
                    }

                    // Validate password match
                    if (RegisterRequest.Password != RegisterRequest.ConfirmPassword)
                    {
                        RegisterErrorMessage = "Mật khẩu không khớp";
                        return Page();
                    }

                    // Validate password length
                    if (RegisterRequest.Password.Length < 6)
                    {
                        RegisterErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự";
                        return Page();
                    }

                    // Validate email format
                    if (!RegisterRequest.Email.Contains("@"))
                    {
                        RegisterErrorMessage = "Email không hợp lệ";
                        return Page();
                    }

                    // Register logic
                    var result = await _authService.RegisterAsync(RegisterRequest);
                    
                    // Store email in TempData for OTP page
                    TempData["RegisterEmail"] = RegisterRequest.Email;
                    SuccessMessage = result;

                    // Redirect to OTP verification page
                    return RedirectToPage("/Auth/VerifyOtp");
                }

                return Page();
            }
            catch (Exception ex)
            {
                if (FormType == "Login")
                {
                    LoginErrorMessage = ex.Message;
                }
                else if (FormType == "Register")
                {
                    RegisterErrorMessage = ex.Message;
                }
                return Page();
            }
        }
    }
}

