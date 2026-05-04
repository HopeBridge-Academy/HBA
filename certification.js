// certification.js
function verifyCertification(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('full-name').value.trim();
    const studentId = document.getElementById('student-id').value.trim();
    const resultElement = document.getElementById('certification-result');

    if (!fullName || !studentId) {
        resultElement.textContent = 'لطفاً نام و شناسه دانشجو را وارد کنید.';
        resultElement.classList.add('status-not-found');
        return;
    }

    // Mock student data (بعداً می‌توانید به API متصل کنید)
    const students = [
        { id: 'C123', name: 'John Doe', status: 'enrolled', department: 'Computer Science' },
        { id: 'E00002', name: 'Fowzia Stanakzai', status: 'graduated', department: 'English', graduationYear: 2025 },
        { id: 'E00001', name: 'Mohadesa Sadat Salahshor', status: 'graduated', department: 'English', graduationYear: 2025 }
    ];

    const student = students.find(s => 
        s.id.toLowerCase() === studentId.toLowerCase() && 
        s.name.toLowerCase() === fullName.toLowerCase()
    );

    // پاک کردن کلاس‌های قبلی
    resultElement.classList.remove('status-enrolled', 'status-graduated', 'status-not-found');

    if (student) {
        if (student.status === 'enrolled') {
            resultElement.textContent = `Student, ${student.name} is currently enrolled in the ${student.department} department. ✅`;
            resultElement.classList.add('status-enrolled');
        } else if (student.status === 'graduated') {
            resultElement.textContent = `Mr./Ms. ${student.name} graduated from the ${student.department} department in ${student.graduationYear}. ✅`;
            resultElement.classList.add('status-graduated');
        }
    } else {
        resultElement.textContent = 'The provided name and ID are not valid in HopeBridge Academy. Please ensure that you have entered the name and ID correctly. ❌ نام و شناسه‌ای که وارد کرده‌اید در آکادمی هوپ‌بریج معتبر نیست.';
        resultElement.classList.add('status-not-found');
    }
}

// در صورتی که بخواهید این تابع بعد از لود کامل i18next آماده باشد
document.addEventListener('DOMContentLoaded', function() {
    const certForm = document.getElementById('certification-form');
    if (certForm) {
        certForm.addEventListener('submit', verifyCertification);
    }
});