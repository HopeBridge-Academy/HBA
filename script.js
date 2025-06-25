function initializePage() {
    const authLink = document.getElementById('auth-link');
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        authLink.setAttribute('data-i18n', 'logout');
        authLink.textContent = i18next.t('logout') || 'خروج';
        authLink.onclick = logout; // Attach logout function
        authLink.href = '#'; // Prevent default redirect
    } else {
        authLink.setAttribute('data-i18n', 'login');
        authLink.textContent = i18next.t('login') || 'ورود';
        authLink.href = 'login.html';
    }
}

function initializeLoginPage() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const userRole = sessionStorage.getItem('userRole');
        const users = {
            'superadmin': 'SuperAdmin.html',
            'admin01': 'Admin01.html',
            'admin02': 'Admin02.html',
            'hbat01': 'T01.html',
            'hbat02': 'T02.html',
            'hbat03': 'T03.html',
            'hbat04': 'T04.html',
            'hbat05': 'T05.html',
            'hbat06': 'T06.html',
            'hbat07': 'T07.html',
            'hbat08': 'T08.html'
        };
        window.location.href = users[userRole] || 'login.html'; // Redirect to user's dashboard
    }
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorElement = document.getElementById('login-error');

    // لیست کاربران با نقش‌ها
    const users = {
        'superadmin': { password: 'super520', redirect: 'SuperAdmin.html', role: 'superadmin' },
        'admin01': { password: 'admin313', redirect: 'Admin01.html', role: 'admin' },
        'admin02': { password: 'admin421', redirect: 'Admin02.html', role: 'admin' },
        'hbat01': { password: 'teacher123', redirect: 'T01.html', role: 'teacher' },
        'hbat02': { password: 'teacher101', redirect: 'T02.html', role: 'teacher' },
        'hbat03': { password: 'teacher001', redirect: 'T03.html', role: 'teacher' },
        'hbat04': { password: 'teacher414', redirect: 'T04.html', role: 'teacher' },
        'hbat05': { password: 'teacher999', redirect: 'T05.html', role: 'teacher' },
        'hbat06': { password: 'teacher193', redirect: 'T06.html', role: 'teacher' },
        'hbat07': { password: 'teacher211', redirect: 'T07.html', role: 'teacher' },
        'hbat08': { password: 'teacher491', redirect: 'T08.html', role: 'teacher' }
    };

    if (users[username] && users[username].password === password) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userRole', username);
        sessionStorage.setItem('userType', users[username].role);
        window.location.href = users[username].redirect;
    } else {
        errorElement.textContent = i18next.t('loginError') || 'نام کاربری یا رمز عبور اشتباه است.';
    }
}

function checkAuthentication() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userType = sessionStorage.getItem('userType');
    const userRole = sessionStorage.getItem('userRole');
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = [
        'SuperAdmin.html',
        'Admin01.html',
        'Admin02.html',
        'T01.html',
        'T02.html',
        'T03.html',
        'T04.html',
        'T05.html',
        'T06.html',
        'T07.html',
        'T08.html'
    ];

    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        window.location.href = 'login.html';
    } else if (isLoggedIn && protectedPages.includes(currentPage)) {
        // اجازه دسترسی کامل به superadmin
        if (userType === 'superadmin') {
            return; // superadmin به تمام صفحات دسترسی دارد
        }

        const users = {
            'admin01': 'Admin01.html',
            'admin02': 'Admin02.html',
            'hbat01': 'T01.html',
            'hbat02': 'T02.html',
            'hbat03': 'T03.html',
            'hbat04': 'T04.html',
            'hbat05': 'T05.html',
            'hbat06': 'T06.html',
            'hbat07': 'T07.html',
            'hbat08': 'T08.html'
        };
        const teacherPages = ['T01.html', 'T02.html', 'T03.html', 'T04.html', 'T05.html', 'T06.html', 'T07.html', 'T08.html'];
        
        // اجازه دسترسی به صفحات معلمان برای admin
        if (userType === 'admin' && teacherPages.includes(currentPage)) {
            return; // اجازه دسترسی
        }
        // بررسی نقش برای سایر صفحات
        if (users[userRole] !== currentPage) {
            window.location.href = 'login.html'; // هدایت به login اگر صفحه با نقش مطابقت ندارد
        }
    }
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userType');
    window.location.href = 'login.html';
}

window.addEventListener('load', checkAuthentication);

function saveLessonPlan(event, teacherId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append('teacherId', teacherId);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required for Google Apps Script
    })
    .then(response => {
        if (response.type === 'opaque') {
            alert(i18next.t('lessonPlanSaved') || 'Lesson plan saved successfully!');
            loadSearchData(); // Refresh search results
        } else {
            throw new Error('Failed to save lesson plan');
        }
    })
    .catch(error => {
        console.error('Error saving lesson plan:', error);
        alert(i18next.t('saveError') || 'Error saving lesson plan');
    });
}

function saveReporting(event, teacherId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append('teacherId', teacherId);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required for Google Apps Script
    })
    .then(response => {
        if (response.type === 'opaque') {
            alert(i18next.t('reportSaved') || 'Report saved successfully!');
            loadSearchData(); // Refresh search results
        } else {
            throw new Error('Failed to save report');
        }
    })
    .catch(error => {
        console.error('Error saving report:', error);
        alert(i18next.t('saveError') || 'Error saving report');
    });
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
    const fullName = document.getElementById('full-name').value;
    const studentId = document.getElementById('student-id').value;
    const resultElement = document.getElementById('certification-result');

    // Mock student data (replace with actual database/API)
    const students = [
        { id: 'C123', name: 'John Doe', status: 'enrolled', department: 'Computer Science' },
        { id: 'E00002', name: 'Fowzia Stanakzai', status: 'graduated', department: 'English', graduationYear: 2025 },
        { id: 'E00001', name: 'Mohadesa Sadat Salahshor', status: 'graduated', department: 'English', graduationYear: 2025 }
    ];

    const student = students.find(s => s.id === studentId && s.name.toLowerCase() === fullName.toLowerCase());

    // Clear previous status classes
    resultElement.classList.remove('status-enrolled', 'status-graduated', 'status-not-found');

    if (student) {
        if (student.status === 'enrolled') {
            resultElement.textContent = `Student, ${student.name} is currently enrolled in the ${student.department} department (English Class). ✅`;
            resultElement.classList.add('status-enrolled');
        } else if (student.status === 'graduated') {
            resultElement.textContent = `Mr./Ms. ${student.name} graduated from the ${student.department} department in ${student.graduationYear}. ✅`;
            resultElement.classList.add('status-graduated');
        }
    } else {
        resultElement.textContent = 'The provided name and ID are not valid in HopeBridge Academy. Please ensure that you have entered the username and ID correctly. ❌ نام و شناسه‌ای که وارد کرده‌اید در آکادمی هوپ‌بریج معتبر نیست. لطفاً مطمئن شوید که نام کاربری و شناسه را به‌درستی وارد کرده‌اید.';
        resultElement.classList.add('status-not-found');
    }
}

function updateCities() {
    const province = document.getElementById('province').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" data-i18n="selectCity">Select City/District</option>';

    const cities = {
        'Badakhshan': [
            'Arghanj Khwa', 'Argo', 'Baharak', 'Darayim', 'Fayzabad', 'Jurm', 'Khash', 
            'Kishim', 'Kohistan', 'Kuf Ab', 'Raghistan', 'Shahri Buzurg', 'Shighnan', 
            'Shiki', 'Tishkan', 'Wakhan', 'Wurduj', 'Yaftali Sufla', 'Yawan', 'Zebak'
        ],
        'Badghis': [
            'Ab Kamari', 'Ghormach', 'Jawand', 'Muqur', 'Qadis', 'Qala-i-Naw', 'Bala Murghab'
        ],
        'Baghlan': [
            'Andarab', 'Baghlan', 'Burka', 'Dahana-i-Ghuri', 'Dushi', 'Firing wa Gharu', 
            'Guzargahi Nur', 'Khinjan', 'Khost wa Firing', 'Nahrin', 'Pul-i-Hisar', 
            'Pul-i-Khumri', 'Tala wa Barfak'
        ],
        'Balkh': [
            'Balkh', 'Chahar Bolak', 'Chahar Kint', 'Chimtal', 'Dawlatabad', 'Dihdadi', 
            'Kaldar', 'Kishindih', 'Marmul', 'Mazar-i-Sharif', 'Nahr-i-Shahi', 'Sholgara', 
            'Shortepa', 'Zari'
        ],
        'Bamyan': [
            'Bamyan', 'Kahmard', 'Panjab', 'Sayghan', 'Shibar', 'Waras', 'Yakawlang'
        ],
        'Daykundi': [
            'Gizab', 'Ishtarlay', 'Kajran', 'Khadir', 'Kiti', 'Miramor', 'Nili', 
            'Sang-i-Takht', 'Shahristan'
        ],
        'Farah': [
            'Anar Dara', 'Bakwa', 'Bala Buluk', 'Farah', 'Gulistan', 'Khaki Safed', 
            'Lash wa Juwayn', 'Pur Chaman', 'Qala-i-Kah', 'Shib Koh'
        ],
        'Faryab': [
            'Almar', 'Andkhoy', 'Bilchiragh', 'Dawlatabad', 'Gurziwan', 'Khani Chahar Bagh', 
            'Khwaja Sabz Posh', 'Kohistan', 'Maymana', 'Pashtun Kot', 'Qaramqul', 
            'Qaysar', 'Shirin Tagab'
        ],
        'Ghazni': [
            'Ab Band', 'Andar', 'Dih Yak', 'Gelan', 'Ghazni', 'Giro', 'Jaghuri', 
            'Malistan', 'Muqur', 'Nawa', 'Nawur', 'Qarabagh', 'Rashidan', 'Waghaz', 
            'Wali Muhammad Shahid Khugyani', 'Zanakhan'
        ],
        'Ghor': [
            'Chaghcharan', 'Chaharsada', 'Dawlat Yar', 'Du Layna', 'Lal wa Sarjangal', 
            'Pasaband', 'Saghar', 'Shahrak', 'Taywara', 'Tulak'
        ],
        'Helmand': [
            'Baghran', 'Dishu', 'Garmsir', 'Kajaki', 'Lashkar Gah', 'Musa Qala', 
            'Nad Ali', 'Nahr-i-Saraj', 'Nawa-i-Barakzayi', 'Nawzad', 'Reg-i-Khan Nishin', 
            'Sangin', 'Washir'
        ],
        'Herat': [
            'Adraskan', 'Chishti Sharif', 'Farsi', 'Ghoryan', 'Gulran', 'Guzara', 
            'Herat City', 'Injil', 'Karukh', 'Kushk', 'Kushki Kuhna', 'Obe', 
            'Pashtun Zarghun', 'Shindand', 'Zinda Jan'
        ],
        'Jowzjan': [
            'Aqcha', 'Darzab', 'Fayzabad', 'Khamyab', 'Khanaqa', 'Khwaja Du Koh', 
            'Mardyan', 'Mingajik', 'Qarqin', 'Qush Tepa', 'Sheberghan'
        ],
        'Kabul': [
            'Bagrami', 'Chahar Asyab', 'Dih Sabz', 'Farza', 'Guldara', 'Istalif', 
            'Kabul City', 'Kalakan', 'Khaki Jabbar', 'Mir Bacha Kot', 'Mussahi', 
            'Paghman', 'Qarabagh', 'Shakardara', 'Surobi'
        ],
        'Kandahar': [
            'Arghandab', 'Arghistan', 'Daman', 'Ghorak', 'Kandahar City', 'Khakrez', 
            'Maruf', 'Miyanshin', 'Panjwayi', 'Reg', 'Shah Wali Kot', 'Shorabak', 
            'Spin Boldak', 'Zhari'
        ],
        'Kapisa': [
            'Alasay', 'Hisa-i-Awali Kohistan', 'Hisa-i-Duwumi Kohistan', 'Koh Band', 
            'Mahmud-i-Raqi', 'Nijrab', 'Tagab'
        ],
        'Khost': [
            'Bak', 'Gurbuz', 'Jaji Maidan', 'Khost City', 'Mandozai', 'Musa Khel', 
            'Nadir Shah Kot', 'Qalandar', 'Sabari', 'Shamal', 'Spera', 'Tani', 'Terezayi'
        ],
        'Kunar': [
            'Asadabad', 'Bar Kunar', 'Chapa Dara', 'Dangam', 'Ghaziabad', 'Khas Kunar', 
            'Marawara', 'Narang', 'Nari', 'Nurgal', 'Sawkay', 'Shigal wa Sheltan', 
            'Sirkanay', 'Wata Pur'
        ],
        'Kunduz': [
            'Aliabad', 'Chardara', 'Dasht-i-Archi', 'Imam Sahib', 'Khanabad', 
            'Kunduz City', 'Qala-i-Zal'
        ],
        'Laghman': [
            'Alingar', 'Alishang', 'Dawlat Shah', 'Mihtarlam', 'Qarghayi'
        ],
        'Logar': [
            'Azra', 'Baraki Barak', 'Charkh', 'Kharwar', 'Khushi', 'Mohammad Agha', 
            'Pul-i-Alam'
        ],
        'Nangarhar': [
            'Achin', 'Bati Kot', 'Behsud', 'Chaparhar', 'Dara-i-Nur', 'Dih Bala', 
            'Dur Baba', 'Goshta', 'Haska Mina', 'Jalalabad', 'Kama', 'Khogyani', 
            'Kot', 'Kuz Kunar', 'Lal Pur', 'Muhmand Dara', 'Nazyan', 'Pachir wa Agam', 
            'Rodat', 'Sherzad', 'Shinwar', 'Surkh Rod'
        ],
        'Nimroz': [
            'Chakhansur', 'Chahar Burjak', 'Dilaram', 'Kang', 'Khash Rod', 'Zaranj'
        ],
        'Nuristan': [
            'Barg-i-Matal', 'Du Ab', 'Kamdesh', 'Mandol', 'Nurgaram', 'Parun', 
            'Wama', 'Waygal'
        ],
        'Paktia': [
            'Ahmadabad', 'Chamkani', 'Dand Patan', 'Gardez', 'Jaji', 'Jani Khel', 
            'Laja Mangal', 'Said Karam', 'Shwak', 'Zadran', 'Zurmat'
        ],
        'Paktika': [
            'Barmal', 'Dila', 'Gayan', 'Gomal', 'Mata Khan', 'Nika', 'Omna', 
            'Sar Hawza', 'Sharan', 'Turwo', 'Urgun', 'Wazakhwa', 'Yahya Khel', 
            'Yosuf Khel', 'Ziruk'
        ],
        'Panjshir': [
            'Anaba', 'Bazarak', 'Dara', 'Hisa-i-Awali Panjshir', 'Hisa-i-Duwumi Panjshir', 
            'Khenj', 'Rokha', 'Shotul'
        ],
        'Parwan': [
            'Bagram', 'Charikar', 'Ghorband', 'Jabal Saraj', 'Kohi Safi', 'Salang', 
            'Sayd Khel', 'Shekh Ali', 'Shinwari', 'Surobi'
        ],
        'Samangan': [
            'Aybak', 'Dara-i-Sufi Bala', 'Dara-i-Sufi Payin', 'Feroz Nakhchir', 
            'Hazrat Sultan', 'Khuram wa Sarbagh', 'Ruyi Du Ab'
        ],
        'Sar-e-Pul': [
            'Balkhab', 'Gosfandi', 'Kohistanat', 'Sancharak', 'Sayyad', 'Sar-e-Pul City', 
            'Sozma Qala'
        ],
        'Takhar': [
            'Baharak', 'Bangi', 'Chah Ab', 'Chal', 'Darqad', 'Farkhar', 'Hazar Sumuch', 
            'Ishkamish', 'Kalafgan', 'Khwaja Ghar', 'Rustaq', 'Taloqan', 'Warsaj', 
            'Yangi Qala'
        ],
        'Uruzgan': [
            'Chora', 'Dehrawud', 'Khas Uruzgan', 'Shahidi Hassas', 'Tarinkot'
        ],
        'Wardak': [
            'Chak', 'Day Mirdad', 'Hisa-i-Awali Behsud', 'Jalrez', 'Maidan Shahr', 
            'Markazi Behsud', 'Nirkh', 'Saydabad'
        ],
        'Zabul': [
            'Arghandab', 'Atghar', 'Daychopan', 'Kakar', 'Mizan', 'Qalat', 
            'Shahjoy', 'Shamulzayi', 'Shinkay', 'Tarnak wa Jaldak'
        ],
        'Other': ['Specify Other']
    };

    (cities[province] || []).forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
    updateContent(); // Preserve existing translation logic
}

// Initialize Page
function initializePage() {
    // Initialize i18next
    i18next.init({
        lng: localStorage.getItem('language') || 'en',
        fallbackLng: 'en',
        resources: {
            en: { translation: translations.en },
            fa: { translation: translations.fa }
        },
        debug: true // Enable debug for missing keys
    }, function(err, t) {
        if (err) {
            console.error('i18next initialization error:', err);
            return;
        }
        updateContent();
    });

    // Show back to top button on scroll
    window.addEventListener('scroll', function() {
        const backToTopBtn = document.getElementById('backToTopBtn');
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('visible', window.scrollY > 300);
        }
    });

    // Initialize FAQ accordion (for faq.html)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            answer.hidden = isExpanded;
        });
    });

    // Initialize Facebook SDK (for ad.html)
    if (window.FB) {
        FB.XFBML.parse();
    }
}

// Update Content for i18n
function updateContent() {
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if (i18next.exists(key)) {
            element.textContent = i18next.t(key);
        } else {
            console.warn(`Translation key "${key}" not found for language "${i18next.language}" on ${window.location.pathname}`);
        }
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        if (i18next.exists(key)) {
            element.placeholder = i18next.t(key);
        } else {
            console.warn(`Placeholder translation key "${key}" not found for language "${i18next.language}" on ${window.location.pathname}`);
        }
    });

    // Update select options
    document.querySelectorAll('select option[data-i18n]').forEach(option => {
        const key = option.dataset.i18n;
        if (i18next.exists(key)) {
            option.textContent = i18next.t(key);
        } else {
            console.warn(`Option translation key "${key}" not found for language "${i18next.language}" on ${window.location.pathname}`);
        }
    });

    // Set document direction for RTL
    document.documentElement.dir = i18next.language === 'fa' ? 'rtl' : 'ltr';
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const mainNav = document.querySelector('.main-nav');
    mainNav.classList.toggle('active');
}

// Change Language
function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    i18next.changeLanguage(lang, (err, t) => {
        if (err) {
            console.error('Language change error:', err);
            return;
        }
        updateContent();
        // Re-parse Facebook SDK for ad.html
        if (window.FB && document.querySelector('.fb-page')) {
            FB.XFBML.parse();
        }
    });
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search Courses
function searchCourses() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    alert(i18next.t('searchMessage', { query: query }));
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#FF6666';
        } else {
            input.style.borderColor = '#00E7FF';
        }
    });
    if (!isValid) {
        alert(i18next.t('formError', 'Please fill out all required fields.'));
    }
    return isValid;
}

// Form Handlers
function submitRegistration(event) {
    event.preventDefault();
    const form = event.target;
    if (!validateForm(form)) return;
    alert(i18next.t('submitSuccess', 'Registration submitted successfully!'));
}

function requestTutor(event) {
    event.preventDefault();
    const form = event.target;
    if (!validateForm(form)) return;
    alert(i18next.t('submitSuccess', 'Tutor request submitted successfully!'));
}

function submitContact(event) {
    event.preventDefault();
    const form = event.target;
    if (!validateForm(form)) return;
    alert(i18next.t('submitSuccess', 'Contact form submitted successfully!'));
}

function submitDonation(event) {
    event.preventDefault();
    const form = event.target;
    if (!validateForm(form)) return;
    alert(i18next.t('submitSuccess', 'Donation submitted successfully!'));
}


