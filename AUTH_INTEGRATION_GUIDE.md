# Hướng Dẫn Tích Hợp Auth - EVCyclePRN22

## ✅ Đã Hoàn Thành

### 1. **Tích Hợp Login/Register với AuthService**
- ✅ Sử dụng `IAuthService` hiện có
- ✅ Validation đầy đủ (client-side + server-side)
- ✅ Xử lý lỗi và thông báo thành công
- ✅ Session management với JWT token

### 2. **Loại Bỏ Tính Năng Quên Mật Khẩu**
- ✅ Xóa link "Quên mật khẩu" khỏi form login
- ✅ Xóa CSS liên quan
- ✅ Đơn giản hóa giao diện

### 3. **Đơn Giản Hóa Giao Diện**
- ✅ Rút gọn text mô tả bên trái
- ✅ Ẩn text "Năng lượng bền vững cho tương lai"
- ✅ Giữ lại logo và battery animation

### 4. **Cập Nhật JavaScript**
- ✅ Form validation nâng cao
- ✅ Loading states
- ✅ Error handling
- ✅ Disable button khi submit

## 🔄 Luồng Hoạt Động

### **Đăng Ký (Register)**
1. User điền form đăng ký
2. Client validation (JavaScript)
3. Server validation (C#)
4. Gọi `AuthService.RegisterAsync()`
5. Tạo user với OTP
6. Gửi email OTP
7. Redirect đến `/VerifyOtp`

### **Xác Thực OTP**
1. User nhập mã OTP 6 chữ số
2. Gọi `AuthService.VerifyOtpAsync()`
3. Kiểm tra OTP và thời gian hết hạn
4. Cập nhật `IsVerified = true`
5. Redirect về `/Login` với thông báo thành công

### **Đăng Nhập (Login)**
1. User điền username/email và password
2. Client validation
3. Server validation
4. Gọi `AuthService.LoginAsync()`
5. Kiểm tra credentials
6. Tạo JWT token
7. Lưu token vào Session
8. Redirect đến `/Index`

### **Đăng Xuất (Logout)**
1. Clear Session
2. Redirect về `/Login`

## 🎨 Giao Diện

### **Trang Login/Register**
- **Hero Section**: Logo + Title + Battery animation (đã đơn giản hóa)
- **Form Section**: Toggle giữa Login/Register
- **Validation**: Real-time với animations
- **Responsive**: Mobile, tablet, desktop

### **Trang OTP**
- **Hero Section**: Logo + Email illustration
- **OTP Input**: 6 ô nhập số với auto-focus
- **Timer**: Countdown 5 phút
- **Resend**: Gửi lại mã OTP

## 🔧 Cấu Hình

### **Connection String**
```json
"DefaultConnection": "Server=localhost;Database=EVCycleDB;Trusted_Connection=True;TrustServerCertificate=True"
```

### **JWT Settings**
```json
"Jwt": {
  "Key": "695313e3605fda85404846152ce9061b872ee189",
  "Issuer": "Team2SWD",
  "Audience": "EVCycleUser"
}
```

### **Email Settings**
```json
"MailSettings": {
  "SmtpServer": "smtp.gmail.com",
  "Port": 587,
  "SenderName": "EVCycle",
  "SenderEmail": "evcycleservice@gmail.com",
  "Password": "zhhcvuipxuevawny"
}
```

## 🚀 Cách Sử Dụng

### **1. Chạy Migration**
```bash
dotnet ef database update --project Infrastructure --startup-project EVCycle
```

### **2. Chạy Ứng Dụng**
```bash
dotnet run --project EVCycle
```

### **3. Truy Cập**
- **Login**: `https://localhost:5001/Login`
- **Register**: Toggle sang tab "Đăng ký"
- **OTP**: Tự động redirect sau khi đăng ký

## 📝 Validation Rules

### **Login**
- Username/Email: Required
- Password: Required

### **Register**
- Username: Required
- Email: Required, valid format
- Password: Required, min 6 characters
- Confirm Password: Must match password
- First Name: Optional
- Last Name: Optional
- Phone: Optional
- Address: Optional

### **OTP**
- OTP: Required, 6 digits
- Timer: 5 minutes expiry

## 🔒 Security Features

- **Password Hashing**: BCrypt
- **JWT Tokens**: Secure authentication
- **Session Management**: HttpOnly cookies
- **Input Validation**: Client + Server
- **XSS Protection**: Built-in ASP.NET Core
- **CSRF Protection**: Built-in ASP.NET Core

## 🎯 Test Cases

### **Đăng Ký Thành Công**
1. Điền form đăng ký hợp lệ
2. Nhận email OTP
3. Nhập OTP đúng
4. Đăng nhập được

### **Đăng Ký Thất Bại**
1. Email đã tồn tại → "Username or Email already existed"
2. Mật khẩu không khớp → "Mật khẩu không khớp"
3. Email không hợp lệ → "Email không hợp lệ"

### **Đăng Nhập Thành Công**
1. Username/Password đúng
2. User đã verified
3. Redirect đến Index

### **Đăng Nhập Thất Bại**
1. Sai username/password → "Incorrect user name or password!"
2. User chưa verified → "Incorrect user name or password!"

## 🐛 Troubleshooting

### **Lỗi "Build failed"**
- Dừng ứng dụng đang chạy
- Chạy `dotnet clean`
- Chạy `dotnet build`

### **Lỗi "Pending changes"**
- Chạy `dotnet ef migrations add UpdateAuthFields --project Infrastructure --startup-project EVCycle`
- Chạy `dotnet ef database update --project Infrastructure --startup-project EVCycle`

### **Lỗi Email không gửi được**
- Kiểm tra MailSettings trong appsettings.json
- Kiểm tra Gmail App Password
- Kiểm tra firewall/antivirus

### **Lỗi Session**
- Kiểm tra `app.UseSession()` trong Program.cs
- Kiểm tra Session timeout

## 📊 Database Schema

### **Users Table**
- `Id` (uniqueidentifier, PK)
- `Username` (nvarchar)
- `Email` (nvarchar)
- `PasswordHash` (nvarchar)
- `FullName` (nvarchar)
- `Address` (nvarchar)
- `PhoneNumber` (nvarchar)
- `IsActive` (bit)
- `Imgs` (nvarchar)
- `IsVerified` (bit)
- `VerificationOtp` (nvarchar)
- `OtpExpiryTime` (datetime2)
- `Role` (int)
- `CreateTime` (datetime2)
- `UpdateTime` (datetime2)
- `isDeleted` (bit)

## 🎉 Kết Quả

Hệ thống auth đã được tích hợp hoàn chỉnh với:
- ✅ Giao diện hiện đại, responsive
- ✅ Validation đầy đủ
- ✅ Security tốt
- ✅ UX/UI mượt mà
- ✅ Tích hợp với AuthService hiện có
- ✅ OTP qua email
- ✅ Session management

**Sẵn sàng để sử dụng!** 🚀
