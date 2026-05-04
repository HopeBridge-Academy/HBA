// certification.js

// ====================== Toast Notification ======================
function showToast(isSuccess) {
    let toast = document.getElementById('custom-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'custom-toast';
        document.body.appendChild(toast);
    }

    if (isSuccess) {
        toast.className = 'toast success';
        toast.innerHTML = `
            <strong>✅ تأیید موفق!</strong><br>
            اطلاعات دانشجو معتبر است.<br>
            <span>Student verified successfully</span>
        `;
    } else {
        toast.className = 'toast error';
        toast.innerHTML = `
            <strong>❌ تأیید ناموفق!</strong><br>
            نام و شناسه وارد شده معتبر نیست.<br>
            <span>The name and ID are not valid</span>
        `;
    }

    toast.style.display = 'block';

    // محو شدن خودکار بعد از ۴ ثانیه
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.style.display = 'none';
            toast.style.opacity = '1';
        }, 600);
    }, 4000);
}

// ====================== Main Verification Function ======================
function verifyCertification(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('full-name').value.trim();
    const studentId = document.getElementById('student-id').value.trim();
    const resultElement = document.getElementById('certification-result');

    // پاک کردن کلاس‌های قبلی
    resultElement.classList.remove('success', 'error');

    if (!fullName || !studentId) {
        resultElement.innerHTML = `
            <strong>⚠️ Please fill in all fields</strong><br>
            <span>Please enter the student's full name and ID.</span><br><br>
            <strong>⚠️ لطفاً تمام فیلدها را پر کنید</strong><br>
            <span>نام کامل و شناسه دانشجو را وارد نمایید.</span>
        `;
        resultElement.classList.add('error');
        showToast(false);   // Toast خطا
        return;
    }

    // Mock student data
    const students = [
        { id: 'C123', name: 'John Doe', status: 'enrolled', department: 'Computer Science' },
        { id: 'E00002', name: 'Fowzia Stanakzai', status: 'graduated', department: 'English', graduationYear: 2025 },
        { id: 'E00001', name: 'Mohadesa Sadat Salahshor', status: 'graduated', department: 'English', graduationYear: 2025 }
    ];

    const student = students.find(s => 
        s.id.toLowerCase() === studentId.toLowerCase() && 
        s.name.toLowerCase() === fullName.toLowerCase()
    );

    if (student) {
        // موفقیت
        let message = '';

        if (student.status === 'enrolled') {
            message = `
                <strong>✅ Verification Successful</strong><br>
                Student <strong>${student.name}</strong> is currently enrolled in <strong>${student.department}</strong> department.<br><br>
                <strong>✅ تأیید با موفقیت انجام شد</strong><br>
                دانشجو <strong>${student.name}</strong> در حال حاضر در رشته <strong>${student.department}</strong> ثبت‌نام شده است.
            `;
        } else if (student.status === 'graduated') {
            message = `
                <strong>✅ Verification Successful</strong><br>
                Mr./Ms. <strong>${student.name}</strong> graduated from <strong>${student.department}</strong> department in ${student.graduationYear}.<br><br>
                <strong>✅ تأیید با موفقیت انجام شد</strong><br>
                جناب آقای / خانم <strong>${student.name}</strong> در سال ${student.graduationYear} از رشته <strong>${student.department}</strong> فارغ‌التحصیل شده‌اند.
            `;
        }

        resultElement.innerHTML = message;
        resultElement.classList.add('success');
        showToast(true);        // Toast موفقیت

    } else {
        // خطا
        resultElement.innerHTML = `
            <strong>❌ Verification Failed</strong><br>
            The name and ID you entered are not valid in HopeBridge Academy.<br>
            Please make sure you have entered the correct information.<br><br>
            <strong>❌ تأیید ناموفق بود</strong><br>
            نام و شناسه وارد شده در آکادمی هوپ‌بریج معتبر نیست.<br>
            لطفاً اطلاعات را به‌درستی وارد کنید.
        `;
        resultElement.classList.add('error');
        showToast(false);       // Toast خطا
    }
}

// ====================== Initialization ======================
document.addEventListener('DOMContentLoaded', function() {
    const certForm = document.getElementById('certification-form');
    if (certForm) {
        certForm.addEventListener('submit', verifyCertification);
    }

    // پاک کردن نتیجه هنگام تایپ
    const inputs = document.querySelectorAll('#full-name, #student-id');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const result = document.getElementById('certification-result');
            if (result) {
                result.innerHTML = '';
                result.classList.remove('success', 'error');
            }
        });
    });
});
