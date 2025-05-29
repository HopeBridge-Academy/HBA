// script.js
function initializePage() {
    const authLink = document.getElementById('auth-link');
    if (localStorage.getItem('isLoggedIn') === 'true') {
        authLink.setAttribute('data-i18n', 'logout');
        authLink.textContent = i18next.t('logout');
    }
}

function initializeLoginPage() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'SuperAdmin.html'; // Redirect to appropriate dashboard
    }
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');

    // Simple client-side authentication (replace with server-side in production)
    const users = {
        'superadmin': { password: 'super520', redirect: 'SuperAdmin.html' },
        'admin01': { password: 'admin313', redirect: 'Admin01.html' },
        'admin02': { password: 'admin421', redirect: 'Admin02.html' },
        'hbat01': { password: 'teacher123', redirect: 'T01.html' },
        'hbat02': { password: 'teacher101', redirect: 'T02.html' },
        'hbat03': { password: 'teacher001', redirect: 'T03.html' },
        'hbat04': { password: 'teacher414', redirect: 'T04.html' },
        'hbat05': { password: 'teacher999', redirect: 'T05.html' },
        'hbat06': { password: 'teacher193', redirect: 'T06.html' },
        'hbat07': { password: 'teacher211', redirect: 'T07.html' },
        'hbat08': { password: 'teacher491', redirect: 'T08.html' }
    };

    if (users[username] && users[username].password === password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', username);
        window.location.href = users[username].redirect;
    } else {
        errorElement.textContent = i18next.t('loginError') || 'Invalid username or password';
    }
}

function saveLessonPlan(event, teacherId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append('teacherId', teacherId);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') alert('Lesson plan saved!');
        else throw new Error('Failed to save');
    })
    .catch(error => console.error('Error saving lesson plan:', error));
}

function saveReporting(event, teacherId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append('teacherId', teacherId);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') alert('Report saved!');
        else throw new Error('Failed to save');
    })
    .catch(error => console.error('Error saving report:', error));
}

function saveAdminData(event, adminId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append('adminId', adminId);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') alert('Admin data saved!');
        else throw new Error('Failed to save');
    })
    .catch(error => console.error('Error saving admin data:', error));
}

function navigateToTeacherPage(page) {
    if (page) window.location.href = page;
}

function navigateToAdminPage(page) {
    if (page) window.location.href = page;
}

function verifyCertification(event) {
    event.preventDefault();
    const studentId = document.getElementById('student-id').value;
    const fullName = document.getElementById('full-name').value;
    const resultElement = document.getElementById('certification-result');

    // Mock verification (replace with actual API call)
    resultElement.textContent = `Certification for ${fullName} (ID: ${studentId}) is valid.`;
}

function updateCities() {
    const province = document.getElementById('province').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" data-i18n="selectCity">Select City/District</option>';

    const cities = {
        'Herat': ['Herat City', 'Guzara'],
        'Kabul': ['Kabul City', 'Paghman'],
        'Other': ['Specify Other']
    };

    (cities[province] || []).forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
    updateContent();
}