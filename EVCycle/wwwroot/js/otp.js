// OTP Page JavaScript

// Auto-focus first input on load
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('otp1').focus();
    startTimer();
});

// Move to next input
function moveToNext(current, nextFieldId) {
    if (current.value.length === 1) {
        if (nextFieldId) {
            document.getElementById(nextFieldId).focus();
        }
    }
}

// Move to previous input on backspace
function moveToPrev(event, current, prevFieldId) {
    if (event.key === 'Backspace' && current.value.length === 0) {
        if (prevFieldId) {
            document.getElementById(prevFieldId).focus();
        }
    }
}

// Only allow numbers
document.querySelectorAll('.otp-input').forEach(input => {
    input.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 1) {
            this.value = this.value.charAt(0);
        }
    });
    
    // Add paste support
    input.addEventListener('paste', function(e) {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
        
        if (pasteData.length === 6) {
            for (let i = 0; i < 6; i++) {
                document.getElementById(`otp${i + 1}`).value = pasteData[i];
            }
            document.getElementById('otp6').focus();
        }
    });
});

// Combine OTP digits before submit
function combineOtp() {
    const otp1 = document.getElementById('otp1').value;
    const otp2 = document.getElementById('otp2').value;
    const otp3 = document.getElementById('otp3').value;
    const otp4 = document.getElementById('otp4').value;
    const otp5 = document.getElementById('otp5').value;
    const otp6 = document.getElementById('otp6').value;
    
    const fullOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    document.getElementById('otpValue').value = fullOtp;
}

// Timer functionality
let timeLeft = 300; // 5 minutes in seconds

function startTimer() {
    const timerElement = document.getElementById('timer');
    
    const countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.textContent = '0:00';
            timerElement.parentElement.innerHTML = `
                <svg class="timer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="12" y1="8" x2="12" y2="12" stroke-width="2" stroke-linecap="round"/>
                    <line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span style="color: #fca5a5;">Mã OTP đã hết hạn</span>
            `;
            
            // Disable submit button
            document.querySelector('.submit-btn').disabled = true;
            document.querySelector('.submit-btn').style.opacity = '0.5';
            document.querySelector('.submit-btn').style.cursor = 'not-allowed';
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            timeLeft--;
        }
    }, 1000);
}

// Resend OTP functionality
document.getElementById('resendOtp')?.addEventListener('click', async function() {
    const email = document.querySelector('input[name="Email"]').value;
    
    if (!email) {
        showMessage('Không tìm thấy email', 'error');
        return;
    }
    
    try {
        this.disabled = true;
        this.textContent = 'Đang gửi...';
        
        // Call API to resend OTP (you need to implement this endpoint)
        // For now, just show success message
        setTimeout(() => {
            showMessage('Mã OTP mới đã được gửi đến email của bạn', 'success');
            this.disabled = false;
            this.textContent = 'Gửi lại mã';
            
            // Reset timer
            timeLeft = 300;
            startTimer();
            
            // Clear input fields
            for (let i = 1; i <= 6; i++) {
                document.getElementById(`otp${i}`).value = '';
            }
            document.getElementById('otp1').focus();
        }, 2000);
        
    } catch (error) {
        showMessage('Có lỗi xảy ra. Vui lòng thử lại', 'error');
        this.disabled = false;
        this.textContent = 'Gửi lại mã';
    }
});

// Show message function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'error' ? 'error-message show' : 'success-message show';
    messageDiv.innerHTML = `
        <svg class="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            ${type === 'error' 
                ? `<circle cx="12" cy="12" r="10" stroke-width="2"/>
                   <line x1="12" y1="8" x2="12" y2="12" stroke-width="2" stroke-linecap="round"/>
                   <line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2" stroke-linecap="round"/>`
                : `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                   <polyline points="22 4 12 14.01 9 11.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
            }
        </svg>
        <span>${message}</span>
    `;
    
    // Insert before form
    const form = document.querySelector('.auth-form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Add input animations
document.querySelectorAll('.otp-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.1)';
        this.style.borderColor = '#10b981';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
        if (this.value === '') {
            this.style.borderColor = 'rgba(71, 85, 105, 0.5)';
        }
    });
});

// Auto-hide messages
setTimeout(() => {
    const messages = document.querySelectorAll('.error-message, .success-message');
    messages.forEach(msg => {
        if (msg.classList.contains('show')) {
            msg.classList.remove('show');
        }
    });
}, 5000);

