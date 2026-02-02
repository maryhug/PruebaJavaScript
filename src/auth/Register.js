import router from "../router/Router.js";
import authService from "../services/authService.js";  // Asegúrate de importar
import { showNotification } from "../utils/helpers.js";

export function renderRegister() {
    const app = document.getElementById('app');

    app.innerHTML = `
     <main class="page">
      <section class="register">  <!-- Cambié class para diferenciar -->
        <header class="brand">
          <div class="brand__logo" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="img" aria-label="Logo">
              <rect x="4" y="4" width="40" height="40" rx="10" />
              <path d="M20 14c4 2 6 6 6 10s-2 8-6 10M28 14c4 2 6 6 6 10s-2 8-6 10" fill="none" stroke-width="3" stroke-linecap="round" />
              <circle cx="24" cy="24" r="3.5" />
            </svg>
          </div>
          <div class="brand__name">CRUDZASO</div>
        </header>

        <article class="card">
          <h1>Create account</h1>
          <p class="card__subtitle">Join the academic performance platform today</p>

          <form id="registerForm" class="form" action="#">  <!-- ← Agregué id -->
            <label class="field">
              <span>Full Name</span>
              <input type="text" name="fullName" placeholder="John Doe" autocomplete="name" required />
            </label>

            <label class="field">
              <span>Email address</span>
              <input type="email" name="email" placeholder="student@university.edu" autocomplete="email" required />
            </label>

            <label class="field">
              <span>Password</span>
              <input type="password" name="password" placeholder="Create a password" autocomplete="new-password" minlength="6" required />
            </label>

            <label class="field">
              <span>Confirm Password</span>
              <input type="password" name="confirmPassword" placeholder="Confirm password" autocomplete="new-password" required />
            </label>

            <button class="primary" type="submit" id="registerBtn">Register</button>  <!-- ← id para botón -->

            <p class="form__footer">
              Already have an account?
              <a class="link login-link" href="/login">Sign in</a>  <!-- ← class para selector -->
            </p>
          </form>
        </article>
      </section>
    </main>
    `;

    // Event listeners → CORREGIDOS
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.querySelector('.login-link').addEventListener('click', (e) => {  // ← querySelector en lugar de getElementById
        e.preventDefault();
        router.navigate('/login');
    });
}

async function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const fullName = formData.get('fullName')?.trim();
    const email = formData.get('email')?.trim();
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    const btn = document.getElementById('registerBtn');
    btn.disabled = true;
    btn.textContent = 'Creating...';

    // Validaciones locales
    if (!fullName) return showNotification('Full name is required', 'error');
    if (!email || !email.includes('@')) return showNotification('Valid email required', 'error');
    if (password.length < 6) return showNotification('Password must be at least 6 characters', 'error');
    if (password !== confirmPassword) return showNotification('Passwords do not match', 'error');

    // Asignar rol automático por email
    const role = email.endsWith('@admin.com') ? 'admin' : 'guest';

    try {
        const result = await authService.register({ fullName, email, password, role });

        if (result.success) {
            showNotification('Account created successfully! Logging in...', 'success');
            setTimeout(() => {
                if (role === 'admin') {
                    router.navigate('/admin');
                } else {
                    router.navigate('/dashboard');
                }
            }, 1000);
        } else {
            showNotification(result.message || 'Registration failed', 'error');
        }
    } catch (error) {
        showNotification('Network error. Try again.', 'error');
    } finally {
        e.target.reset();  // ← Limpia formulario siempre
        btn.disabled = false;
        btn.textContent = 'Register';
    }
}
