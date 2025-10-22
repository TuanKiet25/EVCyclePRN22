// Auth Page JavaScript

// DOM Elements
const loginToggle = document.getElementById('loginToggle');
const signupToggle = document.getElementById('signupToggle');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const footerText = document.getElementById('footerText');
const footerLink = document.getElementById('footerLink');
const toggleSlider = document.querySelector('.toggle-slider');

// Toggle between login and signup
function switchToLogin() {
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');
    toggleSlider.classList.remove('signup');
    
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    
    formTitle.textContent = 'Chào mừng';
    formSubtitle.textContent = 'Truy cập tài khoản của bạn';
    footerText.textContent = 'Chưa có tài khoản?';
    footerLink.textContent = 'Tạo tài khoản';
    
    // Show/hide error messages
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');
    if (loginError) loginError.style.display = 'flex';
    if (registerError) registerError.style.display = 'none';
    
    // Add animation
    loginForm.style.animation = 'fadeIn 0.4s ease-out';
}

function switchToSignup() {
    loginToggle.classList.remove('active');
    signupToggle.classList.add('active');
    toggleSlider.classList.add('signup');
    
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    
    formTitle.textContent = 'Tạo tài khoản';
    formSubtitle.textContent = 'Tham gia EVCycle để giao dịch';
    footerText.textContent = 'Đã có tài khoản?';
    footerLink.textContent = 'Đăng nhập ở đây';
    
    // Show/hide error messages
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');
    if (loginError) loginError.style.display = 'none';
    if (registerError) registerError.style.display = 'flex';
    
    // Add animation
    registerForm.style.animation = 'fadeIn 0.4s ease-out';
}

// Event Listeners
loginToggle.addEventListener('click', switchToLogin);
signupToggle.addEventListener('click', switchToSignup);
footerLink.addEventListener('click', () => {
    if (loginForm.style.display === 'none') {
        switchToLogin();
    } else {
        switchToSignup();
    }
});

// Password Toggle Function
function togglePassword(button) {
    const input = button.previousElementSibling;
    const eyeIcon = button.querySelector('.eye-icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="1" y1="1" x2="23" y2="23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    } else {
        input.type = 'password';
        eyeIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    }
}

// Form Validation
loginForm.addEventListener('submit', function(e) {
    const username = this.querySelector('input[name="LoginRequest.Username"]').value;
    const password = this.querySelector('input[name="LoginRequest.Password"]').value;
    
    if (!username || !password) {
        e.preventDefault();
        showError('Vui lòng điền đầy đủ thông tin');
        return false;
    }
    
    // Add loading state
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
});

registerForm.addEventListener('submit', function(e) {
    const username = this.querySelector('input[name="RegisterRequest.Username"]').value;
    const email = this.querySelector('input[name="RegisterRequest.Email"]').value;
    const password = this.querySelector('input[name="RegisterRequest.Password"]').value;
    const confirmPassword = this.querySelector('input[name="RegisterRequest.ConfirmPassword"]').value;
    const firstName = this.querySelector('input[name="RegisterRequest.FirstName"]').value;
    const lastName = this.querySelector('input[name="RegisterRequest.LastName"]').value;
    const phoneNumber = this.querySelector('input[name="RegisterRequest.PhoneNumber"]').value;
    const address = this.querySelector('input[name="RegisterRequest.Address"]').value;
    
    if (!username || !email || !password || !confirmPassword || !firstName || !lastName || !phoneNumber || !address) {
        e.preventDefault();
        showError('Vui lòng điền đầy đủ tất cả thông tin');
        return false;
    }
    
    if (password !== confirmPassword) {
        e.preventDefault();
        showError('Mật khẩu không khớp');
        return false;
    }
    
    if (password.length < 6) {
        e.preventDefault();
        showError('Mật khẩu phải có ít nhất 6 ký tự');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        e.preventDefault();
        showError('Email không hợp lệ');
        return false;
    }
    
    // Add loading state
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
});

// Show Error Message
function showError(message) {
    // Remove existing dynamic error messages
    const existingErrors = document.querySelectorAll('.error-message:not(#loginError):not(#registerError)');
    existingErrors.forEach(error => error.remove());
    
    // Determine which form is active
    const isLoginForm = loginForm.style.display !== 'none';
    
    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show';
    errorDiv.innerHTML = `
        <svg class="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <line x1="12" y1="8" x2="12" y2="12" stroke-width="2" stroke-linecap="round"/>
            <line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>${message}</span>
    `;
    
    // Insert before active form
    const activeForm = isLoginForm ? loginForm : registerForm;
    activeForm.parentNode.insertBefore(errorDiv, activeForm);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Initialize error message display on page load
document.addEventListener('DOMContentLoaded', function() {
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');
    
    // Check if there's a register error by looking for the span content
    const registerErrorSpan = registerError ? registerError.querySelector('span') : null;
    const loginErrorSpan = loginError ? loginError.querySelector('span') : null;
    
    // Debug: Log the error messages
    console.log('Register error span:', registerErrorSpan ? registerErrorSpan.textContent : 'null');
    console.log('Login error span:', loginErrorSpan ? loginErrorSpan.textContent : 'null');
    
    // If there's a register error, switch to register form and show error
    if (registerError && registerErrorSpan && registerErrorSpan.textContent.trim() !== '') {
        console.log('Switching to register form due to register error');
        // Switch to register form and show the error
        switchToSignup();
        // Make sure the error is visible
        registerError.style.display = 'flex';
    } else if (loginError && loginErrorSpan && loginErrorSpan.textContent.trim() !== '') {
        console.log('Staying on login form due to login error');
        // If there's a login error, stay on login form and show error
        switchToLogin();
        // Make sure the error is visible
        loginError.style.display = 'flex';
    }
});

// Add a function to check for errors after page load
function checkForErrors() {
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');
    
    if (registerError && registerError.querySelector('span') && registerError.querySelector('span').textContent.trim() !== '') {
        switchToSignup();
        registerError.style.display = 'flex';
    } else if (loginError && loginError.querySelector('span') && loginError.querySelector('span').textContent.trim() !== '') {
        switchToLogin();
        loginError.style.display = 'flex';
    }
}

// Check for errors after a short delay to ensure .NET has rendered the errors
setTimeout(checkForErrors, 100);

// Also check immediately when the script loads
checkForErrors();

// Auto-hide messages after 5 seconds
setTimeout(() => {
    const messages = document.querySelectorAll('.error-message, .success-message');
    messages.forEach(msg => {
        if (msg.classList.contains('show')) {
            msg.classList.remove('show');
        }
    });
}, 5000);

// Add input animations on focus
const inputs = document.querySelectorAll('.form-input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

