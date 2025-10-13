using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EVCycle.Pages.Transaction
{
    public class DetailModel : PageModel
    {
        // Khai báo thuộc tính TransactionId để lưu ID giao dịch
        // Thuộc tính này sẽ được điền từ tham số routing
        public int TransactionId { get; set; } // <<<< FIX: Thêm thuộc tính này

        // Ví dụ thuộc tính để lưu chi tiết giao dịch
        // public TransactionDetail TransactionDetail { get; set; }

        // Phương thức OnGet được gọi khi trang được truy cập.
        // Tên tham số 'id' phải khớp với tên trong route attribute @page "{id:int}"
        public async Task<IActionResult> OnGetAsync(int id)
        {
            if (id <= 0)
            {
                return NotFound();
            }

            TransactionId = id; // <<<< FIX: Gán giá trị ID từ route vào thuộc tính

            // TODO: Logic lấy chi tiết giao dịch từ database dựa trên TransactionId
            // TransactionDetail = await _context.Transactions.FindAsync(id);

            // if (TransactionDetail == null)
            // {
            //     return NotFound();
            // }

            return Page();
        }
    }
}
