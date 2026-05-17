document.addEventListener('DOMContentLoaded', () => {
    // Set minimum date to today for the date input
    const dateInput = document.getElementById('dateInput');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    // Set default time to current time + 1 hour
    const timeInput = document.getElementById('timeInput');
    if (timeInput) {
        const now = new Date();
        now.setHours(now.getHours() + 1);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeInput.value = `${hours}:${minutes}`;
    }

    // Dynamic price updating based on location and duration
    const locationSelect = document.getElementById('locationSelect');
    const durationInput = document.getElementById('durationInput');
    const priceDisplay = document.querySelector('.price-estimate strong');
    
    const prices = {
        'tashkent': 20000,
        'andijan': 15000,
        'bukhara': 15000,
        'fergana': 12000,
        'jizzakh': 10000,
        'khorazm': 15000,
        'namangan': 18000,
        'navoiy': 12000,
        'qashqadaryo': 10000,
        'samarqand': 20000,
        'sirdaryo': 10000,
        'surxondaryo': 10000,
        'karakalpakstan': 12000
    };

    function updatePrice() {
        if (!locationSelect || !priceDisplay || !durationInput) return;
        const loc = locationSelect.value;
        const hours = parseInt(durationInput.value) || 1;
        
        if(prices[loc]) {
            const total = prices[loc] * hours;
            const formattedTotal = total.toLocaleString('ru-RU').replace(/,/g, ' ');
            priceDisplay.textContent = `${formattedTotal} so'm`;
            
            // Add a little highlight animation
            priceDisplay.style.color = '#fff';
            priceDisplay.style.transform = 'scale(1.1)';
            priceDisplay.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                priceDisplay.style.color = '#a5b4fc';
                priceDisplay.style.transform = 'scale(1)';
            }, 300);
        }
    }

    if (locationSelect) locationSelect.addEventListener('change', updatePrice);
    if (durationInput) durationInput.addEventListener('input', updatePrice);

    // Form submission animation and handling
    const bookingForm = document.getElementById('bookingForm');
    
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = bookingForm.querySelector('.btn-primary');
            const originalContent = btn.innerHTML;
            
            // Show loading state
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Kutilmoqda...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            // Simulate API call for booking
            setTimeout(() => {
                // Show success state
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Muvaffaqiyatli band qilindi!';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)'; // Success green gradient
                btn.style.opacity = '1';
                btn.style.boxShadow = '0 10px 20px -5px rgba(16, 185, 129, 0.5)';
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }, 1500);
        });
    }

    // Input formatting for car plate (e.g. 01 A 123 AA)
    const carInput = document.querySelector('input[placeholder*="01 A 123 AA"]');
    if (carInput) {
        carInput.addEventListener('input', function(e) {
            let val = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            let formatted = '';
            
            if (val.length > 0) formatted += val.substring(0, 2); // Region
            
            // 01 A 123 AA format
            if (val.length > 2 && isNaN(val[2])) {
                formatted += ' ' + val.substring(2, 3); // Letter
                if (val.length > 3) formatted += ' ' + val.substring(3, 6); // 3 digits
                if (val.length > 6) formatted += ' ' + val.substring(6, 8); // 2 letters
            } 
            // 01 123 AAA format
            else if (val.length > 2) {
                formatted += ' ' + val.substring(2, 5); // 3 digits
                if (val.length > 5) formatted += ' ' + val.substring(5, 8); // 3 letters
            }
            
            this.value = formatted;
        });
    }

    // Search filter for locations.html
    const searchInput = document.getElementById('locationSearch');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.location-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const address = card.querySelector('.loc-address').textContent.toLowerCase();
                if(title.includes(query) || address.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('loginUsername').value;
            const pass = document.getElementById('loginPassword').value;
            const errorMsg = document.getElementById('loginError');
            const btn = loginForm.querySelector('.btn-primary');
            const originalContent = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tekshirilmoqda...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';
            errorMsg.style.display = 'none';

            setTimeout(() => {
                if (user === 'Admin' && pass === 'admin1234') {
                    btn.innerHTML = '<i class="fas fa-check-circle"></i> Muvaffaqiyatli!';
                    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    btn.innerHTML = originalContent;
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                    errorMsg.style.display = 'block';
                }
            }, 1000);
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});
