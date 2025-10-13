using System.ComponentModel.DataAnnotations; // Cần thêm namespace này
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EVCycle.Pages.Account
{
    public class LoginModel : PageModel
    {
        // 1. Thuộc tính để nhận dữ liệu từ Form POST
        // [BindProperty] đảm bảo MVC tự động map dữ liệu POST vào thuộc tính này.
        [BindProperty]
        public InputModel Input { get; set; } // <<<< FIX: Thêm thuộc tính Input

        // 2. Thuộc tính để xử lý URL chuyển hướng sau khi đăng nhập (ReturnUrl)
        public string ReturnUrl { get; set; } // <<<< FIX: Thêm thuộc tính ReturnUrl

        public void OnGet(string returnUrl = null) // Cập nhật OnGet để nhận ReturnUrl
        {
            ReturnUrl = returnUrl ?? Url.Content("~/");
            // Logic chuẩn bị dữ liệu (nếu có)
        }

        // 3. Lớp lồng để định nghĩa cấu trúc dữ liệu đầu vào của form
        public class InputModel
        {
            [Required(ErrorMessage = "Vui lòng nhập Email.")]
            [EmailAddress(ErrorMessage = "Email không hợp lệ.")]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Vui lòng nhập Mật khẩu.")]
            [DataType(DataType.Password)]
            [Display(Name = "Mật khẩu")]
            public string Password { get; set; }

            [Display(Name = "Ghi nhớ tôi?")]
            public bool RememberMe { get; set; }
        }

        // Thêm phương thức OnPostAsync để xử lý khi người dùng nhấn nút Đăng nhập
        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");

            if (ModelState.IsValid)
            {
                // TODO: Thực hiện logic Đăng nhập thực tế ở đây

                // Nếu đăng nhập thành công:
                // return LocalRedirect(returnUrl);
            }

            // Nếu đăng nhập thất bại, vẫn ở lại trang và hiển thị lỗi
            return Page();
        }
    }
}