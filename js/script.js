const API_BASE = ['localhost', '127.0.0.1'].includes(window.location.hostname) ? 'http://localhost:3000' : '';

const App = {
  init() {
    this.decorateNavigation();
    this.setCurrentYear();
    this.attachFormHandlers();
    this.registerServiceWorker();
  },

  decorateNavigation() {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach((link) => {
      const linkPath = link.getAttribute('href');
      if (!linkPath) return;
      if (linkPath.endsWith(currentPath) || (currentPath === '' && linkPath.includes('index.html'))) {
        link.classList.add('active');
      }
    });
  },

  setCurrentYear() {
    const yearElement = document.querySelector('.js-current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  },

  attachFormHandlers() {
    const registerForm = document.querySelector('#register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', this.handleRegister.bind(this));
    }

    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', this.handleLogin.bind(this));
    }

    const reservationForm = document.querySelector('#reservation-form');
    if (reservationForm) {
      reservationForm.addEventListener('submit', this.handleReservation.bind(this));
    }
  },

  async handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
      name: form.querySelector('#full-name')?.value.trim(),
      email: form.querySelector('#email')?.value.trim(),
      password: form.querySelector('#password')?.value,
      confirmPassword: form.querySelector('#confirm-password')?.value,
    };

    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      return this.showFormMessage(form, 'Por favor completa todos los campos.', false);
    }
    if (data.password !== data.confirmPassword) {
      return this.showFormMessage(form, 'Las contraseñas no coinciden.', false);
    }

    const response = await fetch(`${API_BASE}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('huellasToken', result.token);
      this.showFormMessage(form, result.message, true);
      setTimeout(() => window.location.href = '../index.html', 1600);
    } else {
      this.showFormMessage(form, result.message || 'Error al registrar.', false);
    }
  },

  async handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
      email: form.querySelector('#email')?.value.trim(),
      password: form.querySelector('#password')?.value,
    };

    if (!data.email || !data.password) {
      return this.showFormMessage(form, 'Completa correo y contraseña.', false);
    }

    const response = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('huellasToken', result.token);
      this.showFormMessage(form, result.message, true);
      setTimeout(() => window.location.href = '../index.html', 1200);
    } else {
      this.showFormMessage(form, result.message || 'Error al iniciar sesión.', false);
    }
  },

  async handleReservation(event) {
    event.preventDefault();
    const form = event.target;
    const payload = {
      name: form.querySelector('#reserve-name')?.value.trim(),
      email: form.querySelector('#reserve-email')?.value.trim(),
      phone: form.querySelector('#reserve-phone')?.value.trim(),
      roomType: form.querySelector('#reserve-room')?.value,
      checkIn: form.querySelector('#reserve-checkin')?.value,
      checkOut: form.querySelector('#reserve-checkout')?.value,
      guests: form.querySelector('#reserve-guests')?.value,
      message: form.querySelector('#reserve-message')?.value.trim(),
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.roomType || !payload.checkIn || !payload.checkOut || !payload.guests) {
      return this.showFormMessage(form, 'Completa todos los campos obligatorios.', false);
    }

    const response = await fetch(`${API_BASE}/api/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (response.ok) {
      this.showFormMessage(form, result.message, true);
      form.reset();
    } else {
      this.showFormMessage(form, result.message || 'Error al enviar la reserva.', false);
    }
  },

  showFormMessage(form, message, success) {
    let alert = form.querySelector('.form-alert');
    if (!alert) {
      alert = document.createElement('div');
      alert.className = 'form-alert mt-3';
      form.prepend(alert);
    }
    alert.textContent = message;
    alert.className = `form-alert alert ${success ? 'alert-success' : 'alert-danger'} mt-3`;
  },

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(new URL('../sw.js', import.meta.url))
        .then(() => console.log('Service worker registrado'))
        .catch((error) => console.warn('No se pudo registrar service worker:', error));
    }
  },
};

window.addEventListener('DOMContentLoaded', () => App.init());
